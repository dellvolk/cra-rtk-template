import {Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {logout} from "./auth/auth.slice";

export const errorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (action?.payload?.status === 403) { // Non auth
        console.log('non auth')
        console.log({api, action})
        api.dispatch(logout())
    }
    // if (isRejectedWithValue(action)) {
    //     console.warn('We got a rejected action!')
    //     // toast.warn({ title: 'Async error!', message: action.error.data.message })
    // }

    return next(action)
}
