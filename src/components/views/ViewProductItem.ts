import { Component } from "../base/components";
import { EventEmitter } from "../base/events";
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
interface IViewProductItem {
    product: IProduct;
}
export class ViewProductItem extends Component<IViewProductItem> {
    protected titleElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected _product: IProduct;
    protected categoryElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);
        console.log('ViewProductItem создан');

        this.titleElement = ensureElement('.card__title', this.container);
        this.imageElement = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.categoryElement = ensureElement('.card__category', this.container) as HTMLElement;
        this.priceElement = ensureElement('.card__price', this.container) as HTMLElement;

        this.container.addEventListener('click', () => {
            console.log(`Клик по товару`, this._product);
            if (this._product) {
                console.log(`Клик по товару`);
                this.events.emit('item:click', { id: this._product.id })
            }
        });
    }

    set product(value: IProduct) {
        this.titleElement.textContent = value.title;
        this._product = value;
        this.imageElement.src = value.image;
        this.categoryElement.classList.remove(
            'card__category_soft',
            'card__category_hard',
            'card__category_other',
            'card__category_additional',
            'card__category_button'
        );

        this.categoryElement.textContent = value.category;
        if (value.category === 'софт-скил') {
            this.categoryElement.classList.add('card__category_soft');
        } else if (value.category === 'хард-скил') {
            this.categoryElement.classList.add('card__category_hard');
        } else if (value.category === 'другое') {
            this.categoryElement.classList.add('card__category_other');
        } else if (value.category === 'дополнительное') {
            this.categoryElement.classList.add('card__category_additional');
        } else if (value.category === 'кнопка') {
            this.categoryElement.classList.add('card__category_button');
        }
        this.priceElement.textContent = value.price ? value.price + ' синапсов' : 'Бесценно';
    }
}
