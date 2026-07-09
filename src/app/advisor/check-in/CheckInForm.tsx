"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createJobCard } from "@/app/actions/advisor";
import { searchCustomers, searchVehicles, searchTechnicians } from "@/lib/actions/search";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { CreateCustomerModal } from "@/components/advisor/CreateCustomerModal";
import { AddVehicleModal } from "@/components/advisor/AddVehicleModal";
import { Camera, ChevronRight, AlertCircle, UserPlus, CarFront, Fuel, Gauge, Wrench, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckInForm() {
  const router = useRouter();

  // === Selection State ===
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCustomerPhone, setSelectedCustomerPhone] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedTechnicianId, setSelectedTechnicianId] = useState("");

  // === Combobox initial options (for auto-selection after modal create) ===
  const [customerInitialOption, setCustomerInitialOption] = useState<ComboboxOption | undefined>();
  const [vehicleInitialOption, setVehicleInitialOption] = useState<ComboboxOption | undefined>();

  // === Intake State ===
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("1/2");
  const [complaints, setComplaints] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === Modal State ===
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  // === Search callbacks (stable references for Combobox) ===
  const fetchCustomers = useCallback((query: string) => searchCustomers(query), []);

  const fetchVehicles = useCallback(
    (query: string) => searchVehicles(query, selectedCustomerId),
    [selectedCustomerId]
  );

  const fetchTechnicians = useCallback((query: string) => searchTechnicians(query), []);

  // === Handlers ===
  function handleCustomerChange(value: string) {
    setSelectedCustomerId(value);
    // Clear vehicle when customer changes
    setSelectedVehicleId("");
    setVehicleInitialOption(undefined);
    // We don't have the name directly from Combobox onChange, but the Combobox
    // tracks it internally. We'll update the name via the initial option or a workaround.
  }

  function handleCustomerCreated(customerId: number, customerName: string, phone: string) {
    const option: ComboboxOption = {
      value: customerId.toString(),
      label: customerName,
      subLabel: phone,
    };
    setCustomerInitialOption(option);
    setSelectedCustomerId(customerId.toString());
    setSelectedCustomerName(customerName);
    setSelectedCustomerPhone(phone);
    // Clear vehicle since this is a new customer
    setSelectedVehicleId("");
    setVehicleInitialOption(undefined);
    setShowCustomerModal(false);
  }

  function handleVehicleCreated(vehicleId: number, vehicleLabel: string) {
    const option: ComboboxOption = {
      value: vehicleId.toString(),
      label: vehicleLabel,
    };
    setVehicleInitialOption(option);
    setSelectedVehicleId(vehicleId.toString());
    setShowVehicleModal(false);
  }

  function handleAddVehicleClick() {
    if (!selectedCustomerId) {
      toast.error("Please select a customer first before adding a vehicle.");
      return;
    }
    setShowVehicleModal(true);
  }

  const isFormValid = selectedCustomerId && selectedVehicleId && selectedTechnicianId && mileage;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      const order = await createJobCard({
        customerId: parseInt(selectedCustomerId),
        vehicleId: parseInt(selectedVehicleId),
        technicianId: parseInt(selectedTechnicianId),
        checkInMileage: parseInt(mileage, 10),
        fuelLevel: fuel,
        complaints: complaints,
      });
      toast.success("Job card created and dispatched to technician!");
      router.push(`/advisor/jobs/${order.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create job card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyles = "w-full h-[52px] px-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 bg-white";
  const labelStyles = "block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Search */}
          <div>
            <label className={labelStyles}>Select Customer</label>
            <Combobox
              value={selectedCustomerId}
              onChange={handleCustomerChange}
              fetchOptions={fetchCustomers}
              initialOption={customerInitialOption}
              placeholder="Search or select customer"
              emptyText="No customers found."
              triggerClassName={inputStyles}
            />
            <button
              type="button"
              onClick={() => setShowCustomerModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-[#c90a07] transition-colors mt-2"
            >
              <UserPlus className="w-3.5 h-3.5" />
              CREATE NEW CUSTOMER
            </button>
          </div>

          {/* Vehicle Search */}
          <div>
            <label className={labelStyles}>Select Vehicle</label>
            {selectedCustomerId ? (
              <>
                <Combobox
                  key={`vehicle-${selectedCustomerId}`}
                  value={selectedVehicleId}
                  onChange={setSelectedVehicleId}
                  fetchOptions={fetchVehicles}
                  initialOption={vehicleInitialOption}
                  placeholder="Search or select vehicle"
                  emptyText="No vehicles found for this customer."
                  triggerClassName={inputStyles}
                />
                <button
                  type="button"
                  onClick={handleAddVehicleClick}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-[#c90a07] transition-colors mt-2"
                >
                  <CarFront className="w-3.5 h-3.5" />
                  ADD VEHICLE
                </button>
              </>
            ) : (
              <div className={`w-full h-[52px] px-4 flex items-center text-[15px] border-gray-300 border rounded-sm bg-gray-50 text-gray-400 italic`}>
                Select a customer first to see their vehicles
              </div>
            )}
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mileage */}
          <div>
            <label className={labelStyles}>Current Mileage</label>
            <div className="relative">
              <input
                type="number"
                required
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className={inputStyles}
                placeholder="Current Odometer (e.g. 45000)"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-400 font-medium">mi</span>
            </div>
          </div>

          {/* Fuel Level */}
          <div>
            <label className={labelStyles}>Fuel Level</label>
            <div className="flex gap-2 h-[52px]">
              {['Empty', '1/4', '1/2', '3/4', 'Full'].map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setFuel(level)}
                  className={`flex-1 text-[14px] font-medium border rounded-sm transition-colors ${
                    fuel === level
                      ? 'bg-[#001659] text-white border-[#001659]'
                      : 'bg-white text-gray-500 border-gray-300 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complaints */}
        <div>
          <label className={labelStyles}>Customer Complaints & Notes</label>
          <textarea
            rows={4}
            value={complaints}
            onChange={(e) => setComplaints(e.target.value)}
            placeholder="E.g. brake noise..."
            className="w-full p-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 bg-white resize-none outline-none transition-shadow"
          />
        </div>

        {/* Condition Walkaround */}
        <div>
          <label className={labelStyles}>Condition Walkaround</label>
          <div className="w-full h-[120px] border border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center text-slate-400 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
            <Camera className="w-6 h-6 mb-2 text-gray-300" />
            <p className="font-medium text-[15px] text-gray-500">Tap to capture damage photos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technician Search */}
          <div>
            <label className={labelStyles}>Assign Technician</label>
            <Combobox
              value={selectedTechnicianId}
              onChange={setSelectedTechnicianId}
              fetchOptions={fetchTechnicians}
              placeholder="Assign technician"
              emptyText="No technicians found."
              triggerClassName={inputStyles}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full sm:w-auto bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                GENERATING...
              </>
            ) : (
              "GENERATE JOB CARD"
            )}
          </button>
        </div>
      </form>

      {/* === Modals === */}
      <CreateCustomerModal
        open={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onCreated={handleCustomerCreated}
      />

      {selectedCustomerId && (
        <AddVehicleModal
          open={showVehicleModal}
          onClose={() => setShowVehicleModal(false)}
          customerId={parseInt(selectedCustomerId)}
          customerName={selectedCustomerName || "Selected Customer"}
          onCreated={handleVehicleCreated}
        />
      )}
    </>
  );
}
