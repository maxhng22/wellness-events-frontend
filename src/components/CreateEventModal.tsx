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
      setError("Please fill all fields");
      return;
    }

    // check duplicate dates
    const uniqueDates = new Set(proposedDates);
    if (uniqueDates.size !== proposedDates.length) {
      setError("Proposed dates cannot be the same");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await eventsAPI.createEvent({
        eventId,
        proposedDates,
        location,
      });

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
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Create Wellness Event</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={user?.companyName || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            >
              <option value="">Select event</option>
              {eventOptions.map((ev) => (
                <option key={ev._id} value={ev._id}>{ev.eventName}</option>
              ))}
            </select>
          </div>

          {/* Proposed Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Dates</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {proposedDates.map((date, idx) => (
                <input
                  key={idx}
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(idx, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                />
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter postal code / street"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handleSubmit}>
            Create Event
          </Button>

        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}