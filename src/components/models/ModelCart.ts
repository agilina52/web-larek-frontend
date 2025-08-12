import { IEvents } from "../base/events";
import { IProduct } from "../../types";

export class ModelCart {
    protected items: IProduct[] = [];
    constructor(protected events: IEvents) { }

    addCart(product: IProduct): void {
        this.items.push(product);
        this.events.emit('cart:changed', this.items);
    }

    deleteCart(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.events.emit('cart:changed', this.items);
    }
    
    getItems(): IProduct[] {
        return this.items;
    }
}