import { IEvents } from "../base/events";
import { IProduct } from "../../types";

export class ModelProductList {
    protected items: any[] = [];
    constructor(protected events: IEvents) { }

    // метод возвращения массива всех карточек
    getItems(): any[] {
        return this.items;
    }

    // сохранения массива дел на сервере
    setItems(items: any[]) {
        this.items = items;
        this.events.emit('items:changed');
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id)
    }

}
