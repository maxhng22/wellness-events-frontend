import apiClient from "./apiClient";

export const eventsAPI = {
    list() {
        return apiClient.get("/events");
    },

    listByUser() {
        return apiClient.get("/event");
    },

};