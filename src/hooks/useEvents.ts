// hooks/useHREvents.ts
import { useState, useEffect } from "react";
import { eventsAPI } from "../api/eventApi";

export interface EventRow {
  _id: string;
  eventId: {
    _id: string;
    eventName: string;
    vendorUsername: string;
    vendorCompanyName: string;
  };
  vendorId: {
    _id: string;
    name: string;
  } | null;
  proposedDates: string[];
  companyName: string;
  location: string;
  confirmedDate: string | null;
  status: "pending" | "confirmed" | "cancelled";
  remarks: string | null;
  createdBy: {
    _id: string;
    username: string;
    role: string;
    companyName: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function useHREvents() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
  }, [createModalOpen]);

  // Modal controls
  const openModal = (event: EventRow) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const handleCreateEvent = () => {
     setCreateModalOpen(true);
    // Implementation for creating a new event
  }

  const closeCreateModal = () => {  
    setCreateModalOpen(false);
  }

  return {
    events,
    loading,
    error,
    selectedEvent,
    modalOpen,
    openModal,
    closeModal,
    handleCreateEvent,
    createModalOpen,
    closeCreateModal,
    
  };
}