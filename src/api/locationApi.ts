import apiClient from "./apiClient";

export const locationAPI = {
    findByPostcode(postcode: string) {
        return apiClient.get(`/locations/${postcode}`);
    }
};

