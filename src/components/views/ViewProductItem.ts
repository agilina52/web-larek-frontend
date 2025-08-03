import { Component } from "../base/components";
import { EventEmitter } from "../base/events";
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";

interface IViewProductItem {
    product: IProduct;
}
// cardProduct:click - событие нажатия на карточку продукта
export class ViewProductItem extends Component <IViewProductItem> {
    protected titleElement: HTMLElement;
    protected _product: IProduct; // добавлено хранение продукта

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);
        console.log('ViewProductItem создан'); 

        this.titleElement = ensureElement('.card__title', this.container);
// добавить генерацию события по нажатию на карточку продукта
// ---
        this.container.addEventListener('click', () => {
            console.log(`Клик по товару`, this._product);
            if (this._product) {
                console.log(`Клик по товару`);
                this.events.emit('item:click', {id: this._product.id})
            }
        });
    }
// ---

    set product(value: IProduct) {
        this.titleElement.textContent = value.title;
        this._product = value;
    }

// --- рендер для обновления данных продукта
    // render (product: IProduct) {
    //     console.log('Рендер карточки:', product.id); // <- Добавьте эту строку
    //     this.product = product; // Сохраняем продукт
    //     this.title = product.title;
    //     return this.container;  // Здесь можно добавить обновление других элементов карточки
    // }
// ---
}
