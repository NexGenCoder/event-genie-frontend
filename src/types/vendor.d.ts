export type IVendorCreateBody = {
   brandName: string
   brandLogo: string
   location: string
   description?: string
   email: string
   phone: string
}

export type IVendorCreateResponse = {
   message: string
}
