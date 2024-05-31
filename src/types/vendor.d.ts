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

export type IVendor = {
   vendorid: string
   ownerid: string
   brand_name: string
   brand_logo: string
   location: string
   description: string
   email: string
   phone: string
   created_at: string
   updated_at: string
}

export type IVendorsResponse = {
   message: string
   data: IVendor[]
}

export type IVendorResponse = {
   message: string
   data: IVendor
}
