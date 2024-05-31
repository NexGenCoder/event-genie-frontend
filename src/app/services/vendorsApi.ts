import { api } from '@/app/services/api'
import { IVendorCreateBody, IVendorCreateResponse } from '@/types/vendor'

export const vendorApi = api.injectEndpoints({
   endpoints: (builders) => ({
      createVendor: builders.mutation<IVendorCreateResponse, IVendorCreateBody>(
         {
            query: (body) => ({
               url: '/vendor',
               method: 'POST',
               body,
            }),
            invalidatesTags: ['CreateVendor'],
         },
      ),
   }),
})

export const { useCreateVendorMutation } = vendorApi
