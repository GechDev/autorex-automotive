"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { processPayment, completeHandover } from "@/app/actions/cashier";
import { CreditCard, Banknote, Smartphone, CheckCircle2, ChevronRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function CashierSettleForm({
  orderId,
  status,
  grandTotal
}: {
  orderId: number;
  status: string;
  grandTotal: number;
}) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD_POS" | "MOBILE_TRANSFER">("CARD_POS");
  const [reference, setReference] = useState("");

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await processPayment({
        orderId,
        paymentMethod,
        amount: grandTotal,
        referenceNumber: reference || undefined
      });
      toast.success("Payment processed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process payment.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleHandover() {
    setIsProcessing(true);
    try {
      await completeHandover(orderId);
      toast.success("Vehicle handover completed!");
      router.push("/cashier/queue");
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete handover.");
    } finally {
      setIsProcessing(false);
    }
  }

  if (status === "PAID") {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg shadow-emerald-500/10">
        <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
        <h3 className="text-2xl font-black text-emerald-900 mb-2">Payment Cleared</h3>
        <p className="text-emerald-700 font-medium mb-8">
          The invoice has been paid in full. The vehicle is ready to be returned to the customer.
        </p>
        
        <button
          onClick={handleHandover}
          disabled={isProcessing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 text-lg shadow-lg shadow-emerald-600/20"
        >
          {isProcessing ? "Processing..." : "Complete Key Handover"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="bg-white border rounded-xl shadow-sm p-6 space-y-8">
      <div>
        <h3 className="font-bold text-lg text-slate-900 mb-4">Record Payment</h3>
        <p className="text-sm text-slate-500 mb-6">Select the payment method used by the customer at the counter.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-3 transition-all ${
            paymentMethod === 'CARD_POS' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}>
            <input type="radio" name="method" value="CARD_POS" checked={paymentMethod === 'CARD_POS'} onChange={() => setPaymentMethod('CARD_POS')} className="sr-only" />
            <CreditCard className={`w-8 h-8 ${paymentMethod === 'CARD_POS' ? 'text-primary' : 'text-slate-400'}`} />
            <span className={`text-sm font-bold ${paymentMethod === 'CARD_POS' ? 'text-primary' : 'text-slate-600'}`}>Card (POS)</span>
          </label>
          
          <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-3 transition-all ${
            paymentMethod === 'CASH' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}>
            <input type="radio" name="method" value="CASH" checked={paymentMethod === 'CASH'} onChange={() => setPaymentMethod('CASH')} className="sr-only" />
            <Banknote className={`w-8 h-8 ${paymentMethod === 'CASH' ? 'text-primary' : 'text-slate-400'}`} />
            <span className={`text-sm font-bold ${paymentMethod === 'CASH' ? 'text-primary' : 'text-slate-600'}`}>Cash</span>
          </label>

          <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-3 transition-all ${
            paymentMethod === 'MOBILE_TRANSFER' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}>
            <input type="radio" name="method" value="MOBILE_TRANSFER" checked={paymentMethod === 'MOBILE_TRANSFER'} onChange={() => setPaymentMethod('MOBILE_TRANSFER')} className="sr-only" />
            <Smartphone className={`w-8 h-8 ${paymentMethod === 'MOBILE_TRANSFER' ? 'text-primary' : 'text-slate-400'}`} />
            <span className={`text-sm font-bold ${paymentMethod === 'MOBILE_TRANSFER' ? 'text-primary' : 'text-slate-600'}`}>Mobile Tx</span>
          </label>
        </div>
      </div>

      {(paymentMethod === 'CARD_POS' || paymentMethod === 'MOBILE_TRANSFER') && (
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Transaction Reference Number</label>
          <input 
            type="text" 
            required
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="e.g. TXN-8921829"
            className="w-full rounded-md border border-slate-300 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      )}

      <div className="pt-4 border-t border-slate-100">
        <button 
          type="submit" 
          disabled={isProcessing || ((paymentMethod === 'CARD_POS' || paymentMethod === 'MOBILE_TRANSFER') && !reference)}
          className="w-full bg-primary hover:bg-[#c90a07] text-white font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-lg shadow-lg shadow-red-600/20 tracking-wider uppercase"
        >
          {isProcessing ? "Processing..." : `Record $${grandTotal.toFixed(2)} Payment`}
        </button>
      </div>
    </form>
  );
}
