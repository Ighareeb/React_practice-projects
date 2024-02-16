import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//create api file/api slice - generates actions and reducers to handle fetching, caching, updating data from the API
//fetchBaseQuery = utility function to send HTTP req. used as baseQuery for argument for createApi - can customise with headers, base URLS etc.
export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	reducerPath: 'adminApi',
	tagTypes: ['User'],
	//logic for API calls
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `general/user/${id}`, //routes/general.js
			providesTags: ['User'],
		}),
	}),
});

//prefix 'use' suffix 'Query' for the defined API calls being defined in endpoint logic
export const { useGetUserQuery } = api;
