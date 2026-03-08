import { useState } from "react";
import Button from "./Button";
import type { EventRow } from "../types/event.types";
import type { User } from "../types/user.types";
import { formatDate } from "../utils/date";
import { eventsAPI } from "../api/eventApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedEvent?: EventRow | null;
  user: User;
  onUpdated: () => void;
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  pending:   "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  cancelled: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",
};

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5 text-gray-400 dark:text-gray-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
        <div className="text-sm text-gray-800 dark:text-gray-200">{children}</div>
      </div>
    </div>
  );
}

export default function ViewEventModal({ isOpen, onClose, title, selectedEvent, user, onUpdated }: ModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState<string | null>(null);

  //approve event function
  const handleApprove = async () => {
    if (!selectedEvent) return;
    try {
      await eventsAPI.approveEvent(selectedEvent._id, { confirmedDate: selectedDate });
      onUpdated();
      onClose();
    } catch (err) {
      setError("Failed to approve event.");
    }
  };

  //reject event function
  const handleReject = async () => {
    if (!selectedEvent) return;
    try {
      await eventsAPI.rejectEvent(selectedEvent._id, { remarks: remark });
      onUpdated();
      onClose();
    } catch (err) {
      setError("Failed to reject event.");
    }
  };

  // Close modal and reset state
  if (!isOpen) return null;

  // Determine if the event is actionable (i.e. can be approved/rejected)
  const status = selectedEvent?.status ?? "";
  const isActionable = user?.role === "vendor" && status !== "confirmed" && status !== "cancelled";
  const statusCls = statusStyles[status.toLowerCase()] ?? "bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:ring-gray-600";

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
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                {title ?? "Event Details"}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">Review event information</p>
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
        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">

          {error && (
            <div className="flex items-center gap-2.5 px-3.5 py-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl">
              <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {selectedEvent && (
            <div className="space-y-4">

              {/* Event name */}
              <DetailRow label="Event" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              }>
                <span className="font-medium">{selectedEvent.eventId.eventName}</span>
              </DetailRow>

              {/* Vendor */}
              <DetailRow label="Vendor" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              }>
                {selectedEvent.eventId?.vendorUsername || "-"}
              </DetailRow>

              {/* Status */}
              <DetailRow label="Status" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              }>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusCls}`}>
                  {status || "-"}
                </span>
              </DetailRow>

              {/* Location */}
              <DetailRow label="Location" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                </svg>
              }>
                {selectedEvent.location}
              </DetailRow>

              {/* Confirmed Date */}
              <DetailRow label="Confirmed Date" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/>
                </svg>
              }>
                {selectedEvent.confirmedDate ?? "-"}
              </DetailRow>

              {/* Proposed Dates */}
              <DetailRow label="Proposed Dates" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
              }>
                {isActionable ? (
                  <div className="space-y-2 mt-1">
                    {selectedEvent.proposedDates.map((date) => (
                      <label
                        key={date}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                          selectedDate === date
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 dark:border-indigo-400"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="selectedDate"
                          value={date}
                          checked={selectedDate === date}
                          onChange={() => setSelectedDate(date)}
                          className="accent-indigo-600"
                        />
                        <span className={`text-sm font-medium ${selectedDate === date ? "text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"}`}>
                          {formatDate(date)}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 mt-0.5">
                    {selectedEvent.proposedDates.map((date) => (
                      <p key={date} className="text-sm">{formatDate(date)}</p>
                    ))}
                  </div>
                )}
              </DetailRow>

              {/* Remarks */}
              <DetailRow label="Remarks" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              }>
                {isActionable ? (
                  <textarea
                    rows={3}
                    className="w-full mt-1 px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none transition-all"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Add a remark (required to reject)…"
                  />
                ) : (
                  <p className="text-sm">{selectedEvent.remarks || "-"}</p>
                )}
              </DetailRow>

            </div>
          )}
        </div>

        {/* Footer */}
        {user?.role === "vendor" && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-2 flex-1">
              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={handleReject}
                disabled={!remark.trim() || !isActionable}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleApprove}
                disabled={!selectedDate || !isActionable}
              >
                Approve
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}