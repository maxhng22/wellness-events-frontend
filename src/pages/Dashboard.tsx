// pages/HRDashboard.tsx
import Button from "../components/Button";
import DataTable, { type Column } from "../components/DataTable";
import useHREvents, { type EventRow } from "../hooks/useEvents";
import Modal from "../components/Modal";
import { useAuth } from "../auth/authProvider";
import CreateEventModal from "../components/EventForm";

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

  const { user } = useAuth();

  const columns: Column<EventRow>[] = [
    { header: "Event Name", accessor: (row) => (row.eventId as any)?.eventName ?? "-" },
    { header: "Vendor", accessor: (row) => (row.eventId as any)?.vendorUsername ?? "-" },
    {
      header: "Confirmed Date",
      accessor: (row) => row.confirmedDate || "-",
    },
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {user?.role === "hr" ? "HR Dashboard" : "Vendor Dashboard"}
      </h1>

      {/* <Modal isOpen={true} onClose={closeModal} title="Event Details"> */}

      {/* </Modal> */}

      <div className="mb-4 flex justify-end">

        {user?.role === "hr" && (
          <Button
            onClick={handleCreateEvent}
            type="submit"
            variant="primary"
            size="lg"
          >
            Create New Event
          </Button>)}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        columns={columns}
        data={events}
        loading={loading}
        emptyMessage="No events created yet."
      />

      <CreateEventModal isOpen={createModalOpen} onClose={closeCreateModal} onCreated={() => { closeCreateModal }} />
      <Modal isOpen={modalOpen} onClose={closeModal} title="Event Details">
        {selectedEvent && (
          <div className="space-y-2 text-gray-800 dark:text-gray-200">
            <p>
              <strong>Event:</strong> {selectedEvent.eventId.eventName}
            </p>
            <p>
              <strong>Vendor:</strong> {selectedEvent.vendorId?.name || "-"}
            </p>
            <p>
              <strong>Proposed Dates:</strong>{" "}
              {selectedEvent.proposedDates.join(", ")}
            </p>
            <p>
              <strong>Confirmed Date:</strong>{" "}
              {selectedEvent.confirmedDate ?? "-"}
            </p>
            <p>
              <strong>Status:</strong> {selectedEvent.status}
            </p>
            <p>
              <strong>Remarks:</strong> {selectedEvent.remarks || "-"}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {selectedEvent.location} ({selectedEvent.location})
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}