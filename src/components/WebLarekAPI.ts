import { Api, ApiListResponse } from "./base/api";
import { IGetProductListResponce, IOrder, IOrderInfo, IProduct, TProductList } from "../types";
// Описываем типы данных

export interface IWebLarekAPI {
    getProductList: () => Promise<IGetProductListResponce>;
    getProductItem: (id: string) => Promise<IProduct>;
    pushOrder: (order: IOrder) => Promise<IOrderInfo>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    getProductList(): Promise<IGetProductListResponce> {
        return this.get(`/api/weblarek/product/`).then(
            (responce: IGetProductListResponce) => responce
        )
    };
    
    getProductItem(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => item
        )
    };

    pushOrder(order: IOrder): Promise<IOrderInfo> {
        return this.post(`/order`, order).then(
            (orderInfo: IOrderInfo) => orderInfo
        )        
    }
}
