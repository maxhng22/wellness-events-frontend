// hooks/useHREvents.ts
import { useState, useEffect } from "react";
import { eventsAPI } from "../api/eventApi";

export interface EventRow {
  _id: string;
  eventItemId: { name: string };
  vendorId: { name: string };
  proposedDates: string[];
  confirmedDate: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  remarks: string;
  location: { postalCode: string; streetName: string };
}

export default function useHREvents() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await eventsAPI.list();
        if (res.data?.data) setEvents(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Modal controls
  const openModal = (event: EventRow) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  return {
    events,
    loading,
    error,
    selectedEvent,
    modalOpen,
    openModal,
    closeModal,
  };
}