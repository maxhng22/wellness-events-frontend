import { useState, useEffect } from "react";
import Button from "./Button";
import { useAuth } from "../auth/authProvider";
import { eventItemAPI } from "../api/eventItemApi";
import { eventsAPI } from "../api/eventApi";

interface EventOption {
  _id: string;
  eventName: string;
  vendorId: string;
  vendorUsername: string;
  vendorCompanyName: string;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateEventModal({ isOpen, onClose, onCreated }: CreateEventModalProps) {
  const { user } = useAuth();

  const [eventId, setEventId] = useState("");
  const [proposedDates, setProposedDates] = useState(["", "", ""]);
  const [location, setLocation] = useState("");
  const [eventOptions, setEventOptions] = useState<EventOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await eventItemAPI.getEventItems();
        setEventOptions(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to load event options:", err);
      }
    };
    loadEvents();
  }, []);

  const handleDateChange = (index: number, value: string) => {
    if (proposedDates.includes(value)) {
      setError("You cannot choose the same date twice");
      return;
    }
    const newDates = [...proposedDates];
    newDates[index] = value;
    setProposedDates(newDates);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!eventId || proposedDates.some((d) => !d) || !location) {
      setError("Please fill in all fields before submitting");
      return;
    }
    const uniqueDates = new Set(proposedDates);
    if (uniqueDates.size !== proposedDates.length) {
      setError("Proposed dates must all be different");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await eventsAPI.createEvent({ eventId, proposedDates, location });
      onCreated?.();
      clearForm();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setEventId("");
    setProposedDates(["", "", ""]);
    setLocation("");
    setError(null);
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-150";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-800 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200 dark:shadow-indigo-950 shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">Create Wellness Event</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">Fill in the details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {error && (
            <div className="flex items-center gap-2.5 px-3.5 py-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl">
              <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={user?.companyName || ""}
                readOnly
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800/60 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              />
              <svg className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
          </div>

          {/* Event Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Name
            </label>
            <div className="relative">
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className={`${inputClass} appearance-none pr-9`}
              >
                <option value="">Select an event…</option>
                {eventOptions.map((ev) => (
                  <option key={ev._id} value={ev._id}>{ev.eventName}</option>
                ))}
              </select>
              <svg className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>

          {/* Proposed Dates */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Proposed Dates
              <span className="ml-1.5 text-xs font-normal text-gray-400 dark:text-gray-500">— pick 3 different dates</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {proposedDates.map((date, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 font-medium">Option {idx + 1}</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(idx, e.target.value)}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Postal code or street address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${inputClass} pl-10`}
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex gap-2">
          <button
            onClick={() => { clearForm(); onClose(); }}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <div className="flex-1">
            <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handleSubmit}>
              Create Event
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}