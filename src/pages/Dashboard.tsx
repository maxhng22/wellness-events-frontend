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
    triggerRefresh,
  } = useHREvents();

  const { user, logout } = useAuth();

  // Define table columns
  const columns: Column<EventRow>[] = [
    { header: "Event Name", accessor: (row) => (row.eventId as any)?.eventName ?? "-" },
    { header: "Vendor", accessor: (row) => (row.eventId as any)?.vendorUsername ?? "-" },
    { header: "Confirmed Date", accessor: (row) => row.confirmedDate || "-" },
    {
      header: "Status",
      accessor: (row) => {
        const status = row.status ?? "-";
        const styles: Record<string, string> = {
          confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
          pending:   "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
          cancelled: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",
        };
        const cls = styles[status.toLowerCase()] ?? "bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:ring-gray-600";
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${cls}`}>
            {status}
          </span>
        );
      },
    },
    { header: "Date Created", accessor: (row) => row.createdAt ?? "-" },
    {
      header: "Action",
      accessor: (row) => (
        <button
          onClick={() => openModal(row)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 ring-1 ring-inset ring-indigo-200 dark:ring-indigo-500/20 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          View
        </button>
      ),
    },
  ];

  // Calculate summary stats
  const totalEvents = events.length;
  const confirmed = events.filter(e => e.status?.toLowerCase() === "confirmed").length;
  const pending = events.filter(e => e.status?.toLowerCase() === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Header ── */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200 dark:shadow-indigo-950">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                {user?.role === "hr" ? "HR Dashboard" : "Vendor Dashboard"}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Welcome back, <span className="font-medium text-gray-700 dark:text-gray-300">{user?.username}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user?.role === "hr" && (
              <Button onClick={handleCreateEvent} variant="primary" size="md">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Create Event
                </span>
              </Button>
            )}
            <Button onClick={logout} variant="danger" size="md">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Events", value: totalEvents, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
            { label: "Confirmed", value: confirmed, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
            { label: "Pending", value: pending, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
          ].map(({ label, value, icon, color, bg }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <svg className={`w-5 h-5 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={icon}/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? "—" : value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl">
            <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
            </svg>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* ── Table ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">All Events</h2>
            {!loading && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{totalEvents} {totalEvents === 1 ? "record" : "records"}</span>
            )}
          </div>
          <DataTable
            columns={columns}
            data={events}
            loading={loading}
            emptyMessage="No events created yet."
          />
        </div>
      </main>

      <CreateEventModal isOpen={createModalOpen} onClose={closeCreateModal} onCreated={triggerRefresh} />
      <ViewEventModal onUpdated={triggerRefresh} isOpen={modalOpen} onClose={closeModal} selectedEvent={selectedEvent} user={user!} />
    </div>
  );
}