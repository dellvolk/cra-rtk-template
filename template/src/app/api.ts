import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {RootState} from "../store/store"

const baseUrl = "/api"

// const baseQuery = (): BaseQueryFn<
//     {
//         url: string;
//         method: AxiosRequestConfig['method'];
//         data?: AxiosRequestConfig['data'];
//     },
//     unknown,
//     unknown
//     > => async ({ url, method, data }) => {
//     try {
//         const result = await axios({ url: baseUrl + url, method, data });
//         return { data: result.data };
//     } catch (axiosError) {
//         let err = axiosError as AxiosError;
//         return { error: { status: err.response?.status, data: err.response?.data } };
//     }
//
// };

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const token = (getState() as RootState).auth.token
		if (token) {
			headers.set("Authorization", `JWT ${token}`)
		}
		return headers
	},
	// fetchFn: (input, init) => {
	//     console.log({input, init})
	//     // return Promise.resolve();
	//     return input.
	// }
})

export default baseQuery
