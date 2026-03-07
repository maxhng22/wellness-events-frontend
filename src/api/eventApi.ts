import apiClient from "./apiClient";

export const eventsAPI = {
    list() {
        return apiClient.get("/events");
    },

    listByUser() {
        return apiClient.get("/event");
    },
    createEvent(data: {  eventId: string; proposedDates: string[]; location: string }) {
        return apiClient.post("/events", data);
    }

};