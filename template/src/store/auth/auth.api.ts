import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "../../app/api";
import { LoginRequest, LoginResponse } from "../../app/interfaces/auth.types";

const authApi = createApi({
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "auth/jwt/create",
                method: "POST",
                body: credentials
            })
        }),
        refresh: builder.mutation<{access:string}, string>({
            query: (refresh) => ({
                url: "auth/jwt/refresh/",
                method: "POST",
                body: {refresh}
            })
        }),
        permissions: builder.mutation<string[], void>({
            query: (args) => `/permissions/`,
            transformResponse: (res: {permissions: []}, _, q: void | number) => res.permissions
        }),
    })
});

export const { useLoginMutation, usePermissionsMutation, useRefreshMutation } = authApi;

export default authApi
