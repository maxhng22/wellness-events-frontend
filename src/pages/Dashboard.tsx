// pages/HRDashboard.tsx
import Button from "../components/Button";
import DataTable, { type Column } from "../components/DataTable";
import useHREvents from "../hooks/useEvents";
import { useAuth } from "../auth/authProvider";
import CreateEventModal from "../components/CreateEventModal";
import type { EventRow } from "../types/event.types";
import ViewEventModal from "../components/ViewEventModal";

export default function Dashboard() {
  const {
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
  } = useHREvents();

  const { user, logout } = useAuth();

  const columns: Column<EventRow>[] = [
    { header: "Event Name", accessor: (row) => (row.eventId as any)?.eventName ?? "-" },
    { header: "Vendor", accessor: (row) => (row.eventId as any)?.vendorUsername ?? "-" },
    { header: "Confirmed Date", accessor: (row) => row.confirmedDate || "-" },
    { header: "Status", accessor: (row) => row.status ?? "-" },
    { header: "Date Created", accessor: (row) => row.createdAt ?? "-" },
    {
      header: "Action",
      accessor: (row) => (
        <button
          onClick={() => openModal(row)}
          className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-400"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {user?.role === "hr" ? "HR Dashboard" : "Vendor Dashboard"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Welcome back, <span className="font-medium">{user?.username}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === "hr" && (
            <Button onClick={handleCreateEvent} variant="primary" size="md">
              + Create Event
            </Button>
          )}
          <Button onClick={logout} variant="danger" size="md">
            Logout
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        columns={columns}
        data={events}
        loading={loading}
        emptyMessage="No events created yet."
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onCreated={closeCreateModal}
      />

      {/* View Event Modal */}
      <ViewEventModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedEvent={selectedEvent}
        user={user!}
      />
   
    </div>
  );
}