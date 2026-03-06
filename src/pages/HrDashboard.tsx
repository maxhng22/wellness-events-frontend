// pages/HRDashboard.tsx
import DataTable, { type Column } from "../components/DataTable";
import Modal from "../components/Modal";
import useHREvents ,{type EventRow }from "../hooks/useHREvents";

export default function HRDashboard() {
  const {
    events,
    loading,
    error,
    selectedEvent,
    modalOpen,
    openModal,
    closeModal,
  } = useHREvents();

const columns: Column<EventRow>[] = [
  { header: "Event Name", accessor: (row) => row.eventItemId.name },
  { header: "Vendor", accessor: (row) => row.vendorId.name },
  {
    header: "Confirmed Date",
    accessor: (row) => row.confirmedDate ?? row.proposedDates.join(", "),
  },
  { header: "Status", accessor: "status" },
  { header: "Date Created", accessor: "createdAt" },
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
        HR Dashboard
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        columns={columns}
        data={events}
        loading={loading}
        emptyMessage="No events created yet."
      />

      <Modal isOpen={modalOpen} onClose={closeModal} title="Event Details">
        {selectedEvent && (
          <div className="space-y-2 text-gray-800 dark:text-gray-200">
            <p>
              <strong>Event:</strong> {selectedEvent.eventItemId.name}
            </p>
            <p>
              <strong>Vendor:</strong> {selectedEvent.vendorId.name}
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
              {selectedEvent.location.streetName} ({selectedEvent.location.postalCode})
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}