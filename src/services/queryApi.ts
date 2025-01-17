import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface CustomError {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'https://jsonplaceholder.typicode.com/';

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: 'users',
      }),
    }),
  }),
});

export const {useGetUsersQuery} = queryApi;
