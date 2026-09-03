import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});


// ==========================================
// REQUEST INTERCEPTOR
// Attach access token to every request
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// RESPONSE INTERCEPTOR
// Refresh expired access token
// ==========================================

api.interceptors.response.use(

    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;


        // Check if access token expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;


            const refreshToken =
                localStorage.getItem("refresh_token");


            // No refresh token
            if (!refreshToken) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/login";

                return Promise.reject(error);
            }


            try {

                // Request a new access token
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/auth/refresh/",
                    {
                        refresh: refreshToken,
                    }
                );


                const newAccessToken =
                    response.data.access;


                // Save new access token
                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );


                // Because refresh token rotation
                // is enabled in Django
                if (response.data.refresh) {

                    localStorage.setItem(
                        "refresh_token",
                        response.data.refresh
                    );
                }


                // Update original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                // Try the original request again
                return api(originalRequest);

            } catch (refreshError) {

                // Refresh token is also expired/invalid
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);


export default api;