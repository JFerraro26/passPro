import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
    reducerPath: "authentication",
    tagTypes: ["Token"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            try {
                const token = getState().authentication.token;

                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            } catch (error) {
                console.error(error);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (info) => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new formData(info);
                } else {
                    formData = new FormData();
                    formData.append("username", info.username);
                    formData.append("password", info.password);
                }
                return {
                    url: "/token",
                    method: "post",
                    body: formData,
                    credentials: "include",
                };
            },
            invalidatesTags: (result) => {
                return (result && ["Token"]) || [];
            },
            // transformResponse: (response) => {
            //     console.log(response);
            //     const data = JSON.parse(response);
            //     const { username, email, avatar_img, event_manager } = data;
            //     return { username, email, avatar_img, event_manager };
            // },
        }),
        getToken: builder.query({
            query: () => ({
                url: "/token",
                credentials: "include",
            }),
            providesTags: ["Token"],
            onError: (error) => {
                if (error.status === 401) {
                    console.error("Unauthorized error:", error);
                }
            },
        }),
        signUp: builder.mutation({
            query: (info) => {
                const { username, password, avatar_img, email, event_manager } =
                    info;
                const body = JSON.stringify({
                    username,
                    password,
                    avatar_img,
                    email,
                    event_manager,
                });

                return {
                    url: "/api/accounts",
                    method: "post",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
        }),

        update: builder.mutation({
            query: ({ accountId, updatedAccount }) => {
                const { username, avatar_img, email, event_manager } =
                    updatedAccount;
                console.log(accountId);
                const body = JSON.stringify({
                    username,
                    avatar_img,
                    email,
                    event_manager,
                });

                return {
                    url: `/api/accounts/${accountId}`,
                    method: "put",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            invalidatesTags: (result) => {
                return (result && ["Token"]) || [];
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/token",
                method: "delete",
                credentials: "include",
            }),
            invalidatesTags: ["Token"],
        }),
    }),
});

export const {
    useGetTokenQuery,
    useLoginMutation,
    useSignUpMutation,
    useUpdateMutation,
    useLogoutMutation,
} = accountsApi;
