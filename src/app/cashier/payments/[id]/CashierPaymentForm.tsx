"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { processPayment } from "@/app/actions/cashier";
import { CreditCard, Banknote, Landmark, CheckCircle } from "lucide-react";

export default function CashierPaymentForm({
  orderId,
  totalAmount
}: {
  orderId: number;
  totalAmount: number;
}) {
  const router = useRouter();
  const [method, setMethod] = useState<"CASH" | "CARD_POS" | "MOBILE_TRANSFER">("CARD_POS");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: "CARD_POS", label: "Credit Card", icon: <CreditCard className="w-4 h-4" /> },
    { id: "CASH", label: "Cash", icon: <Banknote className="w-4 h-4" /> },
    { id: "MOBILE_TRANSFER", label: "Mobile Transfer", icon: <Landmark className="w-4 h-4" /> },
  ] as const;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await processPayment({
        orderId,
        amount: totalAmount,
        paymentMethod: method,
        referenceNumber: notes || undefined
      });
      alert("Payment recorded successfully!");
      router.push("/cashier/payments");
    } catch (err) {
      console.error(err);
      alert("Failed to process payment.");
      setIsProcessing(false);
    }
  }

  return (
    <div className="bg-emerald-950 text-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-emerald-50">
        Record Payment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-3">
          <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Payment Method</label>
          <div className="grid gap-3">
            {paymentMethods.map(pm => (
              <label 
                key={pm.id} 
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition-all
                  ${method === pm.id 
                    ? 'bg-emerald-800 border-emerald-500' 
                    : 'bg-emerald-900/50 border-emerald-900 hover:border-emerald-700'
                  }`}
              >
                <input 
                  type="radio" 
                  name="payment_method" 
                  value={pm.id} 
                  checked={method === pm.id}
                  onChange={(e) => setMethod(e.target.value as "CASH" | "CARD_POS" | "MOBILE_TRANSFER")}
                  className="hidden"
                />
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                  ${method === pm.id ? 'border-emerald-400' : 'border-emerald-700'}
                `}>
                  {method === pm.id && <div className="w-2 h-2 bg-emerald-400 rounded-full" />}
                </div>
                <div className={method === pm.id ? 'text-emerald-50' : 'text-emerald-400'}>
                  {pm.icon}
                </div>
                <span className={`font-semibold ${method === pm.id ? 'text-white' : 'text-emerald-200'}`}>
                  {pm.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Reference / Notes (Optional)</label>
          <input 
            type="text" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Check #1234 or Auth Code"
            className="w-full rounded-md border border-emerald-800 bg-emerald-900/50 px-4 py-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-emerald-50 placeholder-emerald-700 transition-colors"
          />
        </div>

        <div className="pt-4 mt-4 border-t border-emerald-800">
          <div className="flex justify-between items-center mb-6">
            <span className="text-emerald-200 font-medium">Amount to Charge</span>
            <span className="text-2xl font-black">${totalAmount.toFixed(2)}</span>
          </div>
          
          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full bg-emerald-500 text-emerald-950 font-black px-6 py-4 rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Confirm Payment
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
