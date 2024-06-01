import { api } from '@/app/services/api'
import {
   IVendorCreateBody,
   IVendorCreateResponse,
   IVendorResponse,
   IVendorsResponse,
} from '@/types/vendor'

export const vendorApi = api.injectEndpoints({
   endpoints: (builders) => ({
      createVendor: builders.mutation<IVendorCreateResponse, IVendorCreateBody>(
         {
            query: (body) => ({
               url: '/vendor',
               method: 'POST',
               body,
            }),
            invalidatesTags: ['GetVendor', 'GetVendors'],
         },
      ),
      getVendor: builders.query<IVendorResponse, void>({
         query: () => '/vendor',
      }),
      getVendors: builders.query<IVendorsResponse, void>({
         query: () => '/vendors',
      }),
   }),
})

export const {
   useCreateVendorMutation,
   useGetVendorQuery,
   useGetVendorsQuery,
} = vendorApi
