import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import IAdmin_voucher from "../interface/admin_voucher"

export const voucherApi: any = createApi({
    reducerPath: 'voucherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['adPackage'],
    endpoints: (builder) => ({
        getVouchers: builder.query<IAdmin_voucher[], void>({
            query: () => '/ad-packages',
            providesTags: ['adPackage']
        }),
        getVoucher: builder.query<IAdmin_voucher, string>({
            query: (id: string) => `/ad-packages/${id}`,
            providesTags: ['adPackage']
        }),
        addVoucher: builder.mutation<IAdmin_voucher, Omit<IAdmin_voucher, '_id'>>({
            query: (voucher: IAdmin_voucher) => ({
                url: '/ad-packages',
                method: 'POST',
                body: voucher
            }),
            invalidatesTags: ['adPackage']
        }),
        editVoucher: builder.mutation<IAdmin_voucher, Partial<IAdmin_voucher> & Pick<IAdmin_voucher, '_id'>>({
            query: (voucher: IAdmin_voucher) => ({
                url: `/ad-packages/${voucher._id}`,
                method: 'PUT',
                body: voucher
            }),
            invalidatesTags: ['adPackage']
        }),
        removeVoucher: builder.mutation({
            query: (id: string) => ({
                url: `/ad-packages/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['adPackage']
        })
    })
})

export const {
    useGetVouchersQuery,
    useGetVoucherQuery,
    useAddVoucherMutation,
    useEditVoucherMutation,
    useRemoveVoucherMutation,
} = voucherApi