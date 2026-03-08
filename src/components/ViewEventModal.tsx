import { useState } from "react";
import Button from "./Button";
import type { EventRow } from "../types/event.types";
import type { User } from "../types/user.types";
import { formatDate } from "../utils/date";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedEvent?: EventRow | null;
  user: User;
}

export default function ViewEventModal({ isOpen, onClose, title, selectedEvent, user }: ModalProps) {

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [remark, setRemark] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {title && <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>}

        {selectedEvent && (
          <div className="space-y-3 text-gray-800 dark:text-gray-200">

            <p><strong>Event:</strong> {selectedEvent.eventId.eventName}</p>
            <p><strong>Vendor:</strong> {selectedEvent.vendorId?.name || "-"}</p>

            {/* Proposed Dates */}
            <div>
              <strong>Proposed Dates:</strong>

              {user?.role === "vendor" ? (
                <div className="mt-2 space-y-1">
                  {selectedEvent.proposedDates.map((date) => (
                    <label key={date} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="selectedDate"
                        value={date}
                        checked={selectedDate === date}
                        onChange={() => setSelectedDate(date)}
                      />
                      {formatDate(date)}
                    </label>
                  ))}
                </div>
              ) : (
                <div>
                  {selectedEvent.proposedDates.map((date) => (
                    <p key={date}>{formatDate(date)}</p>
                  ))}
                </div>
              )}
            </div>

            <p><strong>Confirmed Date:</strong> {selectedEvent.confirmedDate ?? "-"}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>

            {/* Remarks */}
            <div>
              <strong>Remarks:</strong>

              {user?.role === "vendor" ? (
                <textarea
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter remark..."
                />
              ) : (
                <p>{selectedEvent.remarks || "-"}</p>
              )}
            </div>

            <p><strong>Location:</strong> {selectedEvent.location}</p>

            {/* Vendor Buttons */}
            {user?.role === "vendor" && (
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="danger"
                  size="md"
                  onClick={() =>
                    console.log("Reject", { remark })
                  }
                >
                  Reject
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    console.log("Approve", { selectedDate, remark })
                  }
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        )}
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