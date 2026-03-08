// hooks/useHREvents.ts
import { useState, useEffect } from "react";
import { eventsAPI } from "../api/eventApi";
import type { EventRow } from "../types/event.types";

export default function useHREvents() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false); // to trigger refresh after creating event



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
  }, [refreshFlag]);


  // Trigger a refresh by toggling the refreshFlag
  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };

  // Modal controls
  const openModal = (event: EventRow) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Close modal and reset state
  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  // Handle create event button click
  const handleCreateEvent = () => {
    setCreateModalOpen(true);
    // Implementation for creating a new event
  }

  // Close create event modal and reset state
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
    triggerRefresh,

  };
}