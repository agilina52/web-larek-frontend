import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { EventEmitter } from "../base/events";
import { IProduct } from "../../types";

interface IViewCartProductItem {
    product: IProduct
}

export class ViewCartProductItem extends Component<IViewCartProductItem> {
    protected readonly itemCart: HTMLElement;
    // protected _indexElement: HTMLElement;
    protected _titleElement: HTMLElement;
    protected _priceElement: HTMLElement;
    protected _buttonElement: HTMLButtonElement;
    protected _product: IProduct;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container)

        this.itemCart = container;
        // this._indexElement = ensureElement<HTMLElement>('.basket__item-index', this.itemCart);
        this._titleElement = ensureElement<HTMLElement>('.card__title', this.itemCart);
        this._priceElement = ensureElement<HTMLElement>('.card__price', this.itemCart);
        this._buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.itemCart);

        this._buttonElement.addEventListener('click', () => this.events.emit('cart:delete-item', {id: this._product.id}));
    }

    set product(value: IProduct) {
        this._product = value;
        this._titleElement.textContent = value.title;
        this._priceElement.textContent = value.price;
    }
}

