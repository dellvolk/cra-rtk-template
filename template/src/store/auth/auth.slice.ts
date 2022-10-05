import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import authApi from "./auth.api";

const INITIAL_STATE = {
    token: null, // access token
    permissions: []
} as {
    token: null | string
    permissions: string[]
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials: (state, {payload: {token}}: PayloadAction<{ token: string | null }>
        ) => {
            state.token = token;
        },
        logout: (state) => {
            localStorage.removeItem('refresh')
            return INITIAL_STATE
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
            state.token = payload.access;
            localStorage.setItem('refresh', payload.refresh)
        })
        builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, {payload}) => {
            state.token = payload.access;
            console.log('success')
            // localStorage.setItem('refresh', payload.refresh)
        })
        builder.addMatcher(authApi.endpoints.permissions.matchFulfilled, (state, {payload}) => {
            state.permissions = payload;
        })
    }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectPermissions = (state: RootState) => state.auth.permissions;
