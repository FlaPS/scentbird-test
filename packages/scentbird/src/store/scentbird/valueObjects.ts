export type PurchaseOptionVO = Readonly<{
    price: number
    size: number
    type: 'subscription' | 'demand'
    url: string
}>

export type ProductVO = Readonly<{
    brand: string
    name: string
    purpose: string
    description: string
    purchaseOptions: PurchaseOptionVO[]
    rating: number
    reviews: number
    ingredients: string
    howIsWorks: string
    url: string
}>

export const defaultAddressVO: BillingAddressVO = {
    firstName: '',
    lastName: '',
    street: '',
    suite: '',
    postalCode: '',
    country: '',
}

export type BillingAddressVO = {
    firstName: string
    lastName: string
    street: string
    suite: string
    postalCode: string
    country: string
}

export type ShippingAddressVO = {
    phone?: string
} & BillingAddressVO

export type ShippingInfoVO = {
    shippingAddress: ShippingAddressVO
    billingAddress?: BillingAddressVO
}


