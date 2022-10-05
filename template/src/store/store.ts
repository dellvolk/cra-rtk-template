import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import auth from './auth/auth.slice'
import authApi from './auth/auth.api'
import {errorHandler} from "./middlewares";

export const store = configureStore({
    reducer: {
        auth,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware()
        .concat([authApi.middleware, errorHandler]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
