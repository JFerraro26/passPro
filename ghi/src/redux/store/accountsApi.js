import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
  reducerPath: "authentication",
  tagTypes: ["Token"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
        return (result && ["Account"]) || [];
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    signUp: builder.mutation({
      query: (info) => {
        const { username, password, avatar_img, email, event_manager } = info;
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
  }),
});

export const { useGetTokenQuery, useLoginMutation, useSignUpMutation } =
  accountsApi;
