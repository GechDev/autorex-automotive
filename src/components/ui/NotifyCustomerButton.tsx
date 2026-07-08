"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { sendEmail } from "@/app/actions/email";
import toast from "react-hot-toast";

export default function NotifyCustomerButton({ email, subject, message }: { email: string, subject: string, message: string }) {
  const [isSending, setIsSending] = useState(false);

  const handleNotify = async () => {
    if (!email) {
      toast.error("Customer does not have an email address.");
      return;
    }
    
    setIsSending(true);
    try {
      const result = await sendEmail(email, subject, message);
      if (result.success) {
        toast.success(result.mocked ? "Email Mocked (Check Console)" : "Email sent successfully!");
      } else {
        toast.error("Failed to send Email");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      onClick={handleNotify}
      disabled={isSending}
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all shadow-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 disabled:opacity-50"
      title="Send Email Notification"
    >
      <Mail className="w-4 h-4" />
      {isSending ? "..." : "Notify"}
    </button>
  );
}
