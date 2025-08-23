import { Api } from "./base/api";
import { IGetProductListResponce, IOrder, IOrderInfo, IProduct, TProductList } from "../types";
export interface IWebLarekAPI {
    getProductList: () => Promise<TProductList>;
    getProductItem: (id: string) => Promise<IProduct>;
    pushOrder: (order: IOrder) => Promise<IOrderInfo>;
}
export class WebLarekAPI extends Api implements IWebLarekAPI {
    readonly cdn: string;
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<TProductList> {
        return this.get(`/product`).then((responce: IGetProductListResponce) =>
            responce.items.map((item) => ({ ...item, image: this.cdn + item.image })) as TProductList
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