const API_URL = "http://127.0.0.1:8000/api";

export const getHomepageStatistics = async () => {
    const response = await fetch(`${API_URL}/homepage/`);

    if (!response.ok) {
        throw new Error("Failed to fetch Homepage statistics");
    }

    return await response.json();
};

export const getAboutSocialStatistics = async () => {
    const response = await fetch(`${API_URL}/about/`);

    if (!response.ok) {
        throw new Error("Failed to fetch About social statistics");
    }

    return await response.json();
};