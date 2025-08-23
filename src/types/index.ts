// продукт
export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: string
}

// заказ
export interface IOrder {
    payment: TOrderPayment,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
}
export interface IOrderInfo {
    id: string,
    total: number
}
export interface IGetProductListResponce {
    total: number,
    items: TProductList
}

export type TOrderPayment = "online" | "upon_receipt";
export type TProductList = [IProduct];