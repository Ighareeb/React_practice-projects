import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//create api file/api slice - generates actions and reducers to handle fetching, caching, updating data from the API
//fetchBaseQuery = utility function to send HTTP req. used as baseQuery for argument for createApi - can customise with headers, base URLS etc.
export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	reducerPath: 'adminApi',
	tagTypes: [
		'User',
		'Sales',
		'Products',
		'Customers',
		'Transactions',
		'Geography',
		'Admins',
		'Performance',
		'Dashboard',
	],
	//logic for API calls
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `general/user/${id}`, //routes/general.js
			providesTags: ['User'],
		}),
		getProducts: build.query({
			query: () => 'client/products',
			providesTags: ['Products'],
		}),
		getCustomers: build.query({
			query: () => 'client/customers',
			providesTags: ['Customers'],
		}),
		getTransactions: build.query({
			query: ({ page, pageSize, sort, search }) => ({
				url: 'client/transactions',
				method: 'GET',
				params: { page, pageSize, sort, search },
			}),
			providesTags: ['Transactions'],
		}),
		getGeography: build.query({
			query: () => 'client/geography',
			providesTags: ['Geography'],
		}),
		getSales: build.query({
			query: () => 'sales/sales',
			providesTags: ['Sales'],
		}),
		getAdmins: build.query({
			query: () => 'management/admins',
			providesTags: ['Admins'],
		}),
		getUserPerformance: build.query({
			query: (id) => `management/performance/${id}`,
			providesTags: ['UserPerformance'],
		}),
		getDashboard: build.query({
			query: () => 'general/dashboard',
			providesTags: ['Admins'],
		}),
	}),
});

//prefix 'use' suffix 'Query' for the defined API calls being defined in endpoint logic
export const {
	useGetUserQuery,
	useGetProductsQuery,
	useGetCustomersQuery,
	useGetTransactionsQuery,
	useGetGeographyQuery,
	useGetSalesQuery,
	useGetAdminsQuery,
	useGetUserPerformanceQuery,
	useGetDashboardQuery,
} = api;
