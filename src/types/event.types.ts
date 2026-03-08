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