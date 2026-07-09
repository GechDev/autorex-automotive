"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Save, DollarSign, PenTool, Wrench, Loader2 } from "lucide-react";
import { updateEstimate } from "@/app/actions/advisor";
import { sendSMS } from "@/app/actions/sms";
import toast from "react-hot-toast";

type JobItem = {
  id: number;
  itemName: string;
  itemType: string;
  quantity: number;
  unitPrice: number;
  technicianNotes: string | null;
};

export default function EstimateBuilderForm({
  orderId,
  initialItems,
  customerEmail,
  orderHash
}: {
  orderId: number;
  initialItems: JobItem[];
  customerEmail: string;
  orderHash: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState<JobItem[]>(initialItems);
  const [isSaving, setIsSaving] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  const handlePriceChange = (id: number, price: number) => {
    setItems(items.map(item => item.id === id ? { ...item, unitPrice: price } : item));
  };

  const handleQuantityChange = (id: number, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  };

  async function handleSave(dispatch: boolean) {
    if (dispatch) setIsDispatching(true);
    else setIsSaving(true);

    try {
      const itemsToUpdate = items.map(item => ({
        id: item.id,
        unitPrice: item.unitPrice,
        quantity: item.quantity
      }));
      
      await updateEstimate(orderId, itemsToUpdate, dispatch);
      
      if (dispatch) {
        // Send Email with Magic Link
        const magicLink = `${window.location.origin}/track/${orderHash}`;
        const subject = "AutoRex: Vehicle Inspection Complete";
        const message = `Hi there,\n\nYour vehicle inspection is complete. Please review and approve your estimate by clicking the link below:\n\n${magicLink}\n\nIf you have any questions, please contact your Service Advisor.`;
        
        const emailResult = await sendEmail(customerEmail || "", subject, message);
        if (emailResult.success) {
          toast.success(emailResult.mocked ? `Mocked Email sent to ${customerEmail}!` : `Magic link sent to ${customerEmail}!`);
        } else {
          toast.error("Estimate saved, but Email failed to send.");
        }
        
        router.push("/advisor/jobs");
      } else {
        toast.success("Prices saved successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save estimate.");
    } finally {
      setIsSaving(false);
      setIsDispatching(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-0 divide-y divide-gray-100 border-t border-gray-100">
        {items.length === 0 ? (
          <p className="text-gray-400 italic py-8 text-center">No line items added by the technician yet.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900 text-[18px] tracking-tight">{item.itemName}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500">
                    {item.itemType}
                  </span>
                </div>
                {item.technicianNotes && (
                  <p className="text-[14px] text-gray-500 mt-2 italic flex items-start gap-2">
                    <span className="font-semibold text-gray-400 not-italic uppercase tracking-wider text-[10px] mt-1">Tech Note</span>
                    {item.technicianNotes}
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Qty</label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-20 h-[48px] px-3 border border-gray-300 rounded-sm text-center text-[15px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow bg-white"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Unit Price</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="number" 
                      min="0"
                      step="0.01"
                      className="w-32 h-[48px] pl-9 pr-3 border border-gray-300 rounded-sm text-[15px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow bg-white"
                      value={item.unitPrice}
                      onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 text-right w-24">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Line Total</label>
                  <div className="font-black text-[#001659] text-[18px] py-[10px]">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col md:flex-row items-end justify-between border-t border-gray-300 pt-8 mt-8 gap-8">
        <div className="w-full md:w-1/2 space-y-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tracking Link Preview</p>
          <code className="text-[13px] text-gray-500 bg-gray-50 border border-gray-100 px-4 py-3 rounded-sm block font-mono">
            /track/{orderHash}
          </code>
        </div>
        
        <div className="w-full md:w-auto text-right">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Estimate Total</p>
          <p className="text-[40px] leading-none font-black text-[#001659] tracking-tight">${calculateTotal().toFixed(2)}</p>
          
          <div className="flex flex-col sm:flex-row items-stretch justify-end gap-3 mt-8">
            <button 
              onClick={() => handleSave(false)}
              disabled={isSaving || isDispatching}
              className="px-8 py-4 border border-gray-300 text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider rounded-none disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isSaving ? "SAVING..." : "SAVE DRAFT"}
            </button>
            <button 
              onClick={() => handleSave(true)}
              disabled={isSaving || isDispatching}
              className="px-8 py-4 bg-primary text-white font-bold hover:bg-[#c90a07] transition-colors flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider rounded-none disabled:opacity-50"
            >
              {isDispatching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isDispatching ? "SENDING..." : "DISPATCH TO CUSTOMER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
