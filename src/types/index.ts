// 1) описать типы, которые уже представлены в Postman. т е это по сути готовая типизаций модели данных. отразить типы и описать в документации.
// продукт
export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: string
}
// корзина

export interface IBasket {
    products: TProductList,
    total: number
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