import apiClient from "./apiClient";

export const eventItemAPI = {
    getEventItems() {
        return apiClient.get("/event-items");
    },

    getEventItemById(id: string) {
        return apiClient.get(`/event-items/${id}`);
    },

};