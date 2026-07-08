"use client";

import React, { useState } from "react";
import { Edit, Trash2, Check, X, Loader2, Wrench, AlertTriangle } from "lucide-react";
import { updateService, deleteService } from "@/lib/actions/services";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CommonService } from "@prisma/client";

export function ServiceCard({ service, tableMode = false }: { service: CommonService; tableMode?: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description || "");

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Name is required");
    setIsSaving(true);
    const res = await updateService(service.id.toString(), { name, description });
    setIsSaving(false);
    if (res.success) {
      toast.success("Service updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(res.error || "Failed to update service.");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    const res = await deleteService(service.id.toString());
    setIsDeleting(false);
    setShowDeleteModal(false);
    if (res.success) {
      toast.success("Service deleted!");
    } else {
      toast.error(res.error || "Failed to delete service.");
    }
  };

  // ─── Table Mode: inline edit dialog ──────────────────────────────────────
  if (tableMode) {
    return (
      <>
        {/* Inline edit dialog */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
            <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in fade-in-80 zoom-in-95">
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                <h2 className="font-heading font-bold text-[22px] text-[#001659]">Edit Service</h2>
                <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-8 py-6 space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Service Name <span className="text-primary">*</span></label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="border-gray-300 focus:border-primary" placeholder="Service name" autoFocus />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-28 p-4 text-[15px] text-gray-600 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all" placeholder="Service description" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setIsEditing(false)} className="px-6 py-3 text-[14px] font-bold text-gray-500 border border-gray-300 rounded-none uppercase tracking-wider hover:border-gray-300 transition-all">Cancel</button>
                  <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-3 text-[14px] font-bold text-white bg-primary hover:bg-[#c90a07] rounded-none uppercase tracking-wider disabled:opacity-70 transition-colors">
                    {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compact table action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:text-primary hover:bg-red-50 rounded-lg transition-all"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Delete
          </button>
        </div>

        {/* Delete confirmation dialog */}
        <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <AlertDialogContent className="bg-white border-0 shadow-lg rounded-sm max-w-md">
            <AlertDialogHeader className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <AlertDialogTitle className="font-heading font-bold text-[24px] text-center text-[#001659]">Delete Service</AlertDialogTitle>
              <AlertDialogDescription className="text-center text-gray-500 text-[15px]">
                Are you sure you want to delete <strong className="text-gray-900">{service.name}</strong>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex sm:justify-center gap-3">
              <AlertDialogCancel asChild>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-none h-11 px-8 font-bold text-sm tracking-wider uppercase">Cancel</Button>
              </AlertDialogCancel>
              <Button onClick={(e) => { e.preventDefault(); confirmDelete(); }} disabled={isDeleting} className="bg-red-600 hover:bg-red-700 text-white rounded-none h-11 px-8 font-bold text-sm tracking-wider uppercase border-0">
                {isDeleting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Deleting...</> : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  // ─── Card Mode (editing) ────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-white border border-primary/40 rounded-2xl shadow-[0_10px_40px_-10px_rgba(201,10,7,0.15)] ring-1 ring-primary/20 transition-all h-full">
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="font-heading font-bold text-[18px] border-gray-300 focus:border-primary"
          placeholder="Service Name"
          autoFocus
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full flex-1 p-3 text-[14px] text-gray-600 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all"
          placeholder="Detailed Description"
        />
        <div className="flex justify-end gap-3 mt-1 shrink-0">
          <button 
            onClick={() => setIsEditing(false)}
            className="px-5 py-2.5 text-[14px] font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center min-w-[100px] gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-primary hover:bg-[#c90a07] rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:border-gray-300 transition-all duration-300 h-full">
      
      {/* Decorative Icon Background */}
      <div className="absolute top-6 right-6 p-3 bg-gray-50 rounded-full group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
        <Wrench className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
      </div>

      <div className="flex-1 pr-14 mb-6">
        <h4 className="font-heading font-bold text-[20px] text-[#001659] mb-3 leading-tight group-hover:text-primary transition-colors">{service.name}</h4>
        <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100 shrink-0">
        <button 
          onClick={() => setIsEditing(true)}
          className="flex-1 flex justify-center items-center gap-2 py-2.5 text-[13px] font-semibold text-gray-500 hover:text-primary hover:bg-red-50 rounded-xl transition-all"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <div className="w-[1px] h-4 bg-gray-200"></div>
        <button 
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="flex-1 flex justify-center items-center gap-2 py-2.5 text-[13px] font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
        >
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Delete
        </button>
      </div>

      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent className="bg-white border-0 shadow-lg rounded-sm max-w-md">
          <AlertDialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <AlertDialogTitle className="font-heading font-bold text-[24px] text-center text-[#001659]">
              Delete Service
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-500 text-[15px]">
              Are you sure you want to delete <strong className="text-gray-900">{service.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex sm:justify-center gap-3">
            <AlertDialogCancel asChild>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-none h-11 px-8 font-bold text-sm tracking-wider uppercase">
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
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

    </div>
  );
}
