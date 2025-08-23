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

    getTotalCount() {
        return this.items.length;
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + Number(item.price), 0);
    }

    // Метод для проверки наличия товара по ID
    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    clearCart() {
        this.items = []
    }
}