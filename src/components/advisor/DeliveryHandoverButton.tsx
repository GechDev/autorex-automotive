"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { completeHandoverAction } from "@/app/actions/advisor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export function DeliveryHandoverButton({ jobId, vehicleName, customerName }: { jobId: number, vehicleName: string, customerName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await completeHandoverAction(jobId);
      toast.success("Handover complete. Job closed.");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete handover.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="bg-[#001659] text-white hover:bg-[#001659]/90 px-6 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Confirm Handover
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Vehicle Delivery</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to hand over the keys for {vehicleName} to {customerName}. 
            This action will mark the job as fully COMPLETED and it will be archived.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="bg-[#001659] hover:bg-[#001659]/90 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Handover"
            )}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
