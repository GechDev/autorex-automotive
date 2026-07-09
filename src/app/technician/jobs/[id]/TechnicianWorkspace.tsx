"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addJobItem, deleteJobItem, completeInspection, completeRepair } from "@/app/actions/technician";
import { Plus, Trash2, Wrench, PenTool, CheckCircle, Save } from "lucide-react";

type JobItem = {
  id: number;
  itemName: string;
  itemType: string;
  technicianNotes: string | null;
};

export default function TechnicianWorkspace({
  orderId,
  initialItems,
  status
}: {
  orderId: number;
  initialItems: JobItem[];
  status: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState<JobItem[]>(initialItems);
  
  // New Item State
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"LABOR" | "PART">("LABOR");
  const [newNotes, setNewNotes] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemName) return;
    setIsAdding(true);
    
    try {
      const item = await addJobItem({
        orderId,
        itemName: newItemName,
        itemType: newItemType,
        technicianNotes: newNotes || undefined
      });
      setItems([...items, item as JobItem]);
      setNewItemName("");
      setNewNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task/part");
    } finally {
      setIsAdding(false);
    }
  }

  async function handleDelete(itemId: number) {
    if (!confirm("Are you sure you want to remove this item?")) return;
    try {
      await deleteJobItem(itemId, orderId);
      setItems(items.filter(i => i.id !== itemId));
    } catch (err) {
      alert("Failed to delete item.");
    }
  }

  async function handleComplete() {
    setIsCompleting(true);
    try {
      if (status === "INSPECTION") {
        await completeInspection(orderId);
      } else if (status === "IN_REPAIR") {
        await completeRepair(orderId);
      }
      router.push("/technician/jobs");
    } catch (err) {
      alert("Failed to update status");
      setIsCompleting(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Existing Items */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-[#001659]">Recorded Tasks & Parts</h2>
        </div>
        
        {items.length === 0 ? (
          <p className="text-gray-500 italic py-4 font-medium">No tasks or parts recorded yet. Start building your inspection report below.</p>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="border border-gray-300 bg-white rounded-sm p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 group hover:border-primary transition-colors">
                <div className="flex gap-3">
                  <div className={`mt-1 p-2 rounded-sm ${item.itemType === 'PART' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                    {item.itemType === 'PART' ? <Wrench className="w-5 h-5" /> : <PenTool className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-lg">{item.itemName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600 border border-gray-200">
                        {item.itemType}
                      </span>
                    </div>
                    {item.technicianNotes && (
                      <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded-sm border border-gray-200">
                        <span className="font-semibold text-gray-900">Notes:</span> {item.technicianNotes}
                      </p>
                    )}
                  </div>
                </div>
                
                {status === "INSPECTION" && (
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-400 hover:text-[#c90a07] transition-colors p-2"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Item Form */}
      {status === "INSPECTION" && (
        <div className="mt-10">
          <div className="w-full h-px bg-gray-200 mb-10"></div>
          <div className="flex items-center gap-3 mb-6">
            <Plus className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-[#001659]">Add Line Item</h2>
          </div>
          <form onSubmit={handleAddItem} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Item Name / Task Description</label>
                <input 
                  type="text" 
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Replace Front Brake Pads"
                  className="w-full h-[52px] px-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Type</label>
                <div className="flex gap-2 h-[52px]">
                  <button
                    type="button"
                    onClick={() => setNewItemType("LABOR")}
                    className={`flex-1 font-bold text-[14px] uppercase tracking-wider rounded-sm border transition-colors ${newItemType === 'LABOR' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                  >
                    Labor
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItemType("PART")}
                    className={`flex-1 font-bold text-[14px] uppercase tracking-wider rounded-sm border transition-colors ${newItemType === 'PART' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                  >
                    Part
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Technician Notes (Optional)</label>
              <textarea 
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Add any internal notes, part numbers, or observations for the advisor..."
                rows={2}
                className="w-full p-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder:text-gray-400 bg-white resize-none"
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={isAdding}
                className="bg-primary hover:bg-[#c90a07] text-white px-8 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isAdding ? "ADDING..." : "SAVE LINE ITEM"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-10">
        <div className="w-full h-px bg-gray-200 mb-10"></div>
        <div className="flex justify-end items-center gap-4">
          <button 
            onClick={handleComplete}
            disabled={isCompleting || (status === "INSPECTION" && items.length === 0)}
            className={`font-bold px-8 py-3 rounded-none text-[14px] uppercase tracking-wider transition-all flex items-center gap-2 disabled:opacity-50
              ${status === "INSPECTION" 
                ? 'bg-primary text-white hover:bg-[#c90a07]' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
          >
            <CheckCircle className="w-5 h-5" />
            {isCompleting ? "PROCESSING..." : status === "INSPECTION" ? "SUBMIT INSPECTION" : "MARK WORK COMPLETE"}
          </button>
        </div>
      </div>
    </div>
  );
}
