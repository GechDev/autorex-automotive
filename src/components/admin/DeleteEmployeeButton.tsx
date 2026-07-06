"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteEmployee } from "@/lib/actions/employees";
import { useRouter } from "next/navigation";

export function DeleteEmployeeButton({ employeeId }: { employeeId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      setIsDeleting(true);
      const result = await deleteEmployee(employeeId.toString());
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to delete employee");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-gray-900 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Delete Employee"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
