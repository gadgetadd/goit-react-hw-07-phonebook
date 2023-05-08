import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://645897178badff578ef539ed.mockapi.io' }),
    tagTypes: ['Contacts'],
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: () => "/contacts",
            providesTags: (result) => (result
                ? [...result.map(({ id }) => ({ type: 'Contacts', id })), { type: 'Contacts', id: 'LIST' }]
                : [{ type: 'Contacts', id: 'LIST' }]),
        }),
        addContact: builder.mutation({
            query(body) {
                return {
                    url: "/contacts",
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        deleteContact: builder.mutation({
            query(id) {
                return {
                    url: `/contacts/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }]
        })
    }),
})


export const { useFetchContactsQuery, useAddContactMutation, useDeleteContactMutation } = contactsApi