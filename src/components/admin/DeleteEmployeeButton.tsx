"use client";

import React, { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { deleteEmployee } from "@/lib/actions/employees";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export function DeleteEmployeeButton({ employeeId }: { employeeId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteEmployee(employeeId.toString());
    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      alert(result.error || "Failed to delete employee");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button 
          className="text-gray-900 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete Employee"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-0 shadow-lg rounded-sm max-w-md">
        <AlertDialogHeader className="space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogTitle className="font-heading font-bold text-[24px] text-center text-[#001659]">
            Delete Employee
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-500 text-[15px]">
            Are you sure you want to delete this employee? This action cannot be undone and will permanently remove them from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex sm:justify-center gap-3">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-none h-11 px-8 font-bold text-sm tracking-wider uppercase">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white rounded-none h-11 px-8 font-bold text-sm tracking-wider uppercase border-0"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
