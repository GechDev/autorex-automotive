"use client";

import React, { useState } from "react";
import { Building, Phone, MapPin, Receipt, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  const inputStyles = "w-full h-[52px] px-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 bg-white";
  const labelStyles = "block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide";

  return (
    <div className="max-w-4xl py-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Shop Configuration
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-[#c90a07] text-white px-8 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? "SAVING..." : "SAVE CHANGES"}
        </button>
      </div>

      <div className="space-y-10 max-w-3xl">
        {/* General Info Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-[#001659]">General Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyles}>Shop Name</label>
              <input
                type="text"
                defaultValue="AutoRex Automotive Services"
                className={inputStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Registration Number</label>
              <input
                type="text"
                defaultValue="RC-12345678"
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* Contact & Location */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-[#001659]">Contact & Location</h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyles}>Email Address</label>
                <input
                  type="email"
                  defaultValue="contact@autorex.com"
                  className={inputStyles}
                />
              </div>
              <div>
                <label className={labelStyles}>Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className={inputStyles}
                />
              </div>
            </div>
            <div>
              <label className={labelStyles}>Street Address</label>
              <textarea
                rows={2}
                defaultValue="123 Mechanic Ave, Industrial Layout"
                className="w-full p-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 bg-white resize-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* Financial Settings */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Receipt className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-[#001659]">Financial Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyles}>Currency</label>
              <select className={inputStyles}>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NGN">NGN (₦)</option>
              </select>
            </div>
            <div>
              <label className={labelStyles}>Tax Rate (%)</label>
              <input
                type="number"
                defaultValue="7.5"
                step="0.1"
                className={inputStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Default Labor Rate ($/hr)</label>
              <input
                type="number"
                defaultValue="85.00"
                step="5"
                className={inputStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
