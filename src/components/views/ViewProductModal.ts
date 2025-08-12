// генерируемые события 
// productCardAdd:click - добавление продукта в корзину 
// productCardRem:click - удаление из корзины
//всю наследуется от базового класса modal

import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IProduct } from "../../types";
import { IEvents } from "../base/events";

interface IViewProductModal {
    image: string;
    category: string;
    title: string;
    description: string;
    price: number;
    // button: HTMLButtonElement;
    product: IProduct;
    showModal: boolean;
}
export class ViewProductModal extends Component<IViewProductModal> {

    protected _imageElement: HTMLImageElement;
    protected _categoryElement: HTMLElement;
    protected _titleElement: HTMLElement;
    protected _descriptionElement: HTMLElement;
    protected _priceElement: HTMLElement;
    protected _buttonElement: HTMLButtonElement;
    protected _isActive: boolean;
    protected _product: IProduct;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.initElements();
    }

    protected initElements() {
        this._titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this._descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this._priceElement = ensureElement<HTMLElement>('.card__price', this.container);
        this._imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this._buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);
        
        this._buttonElement.addEventListener('click', () => {
            this.events.emit('cart:add-item', this._product);
        })
    }
    set product(value: IProduct) {
        this._product = value;
        if (!this._titleElement) return; // Защита от вызова до инициализации
        this._titleElement.textContent = value.title;
        this._descriptionElement.textContent = value.description;
        this._priceElement.textContent = `${value.price} синапсов`;
        this._imageElement.src = value.image;
        this._imageElement.alt = value.title;
        this._categoryElement.textContent = value.category;
    }
    set showModal(value: boolean) {
        this._isActive = value;
        if (value) {
            // this.setVisible(this.container); // Метод базового класса для показа
            this.container.classList.add('modal_active');
        } else {
            // this.setHidden(this.container); // Метод базового класса для скрытия
            this.container.classList.remove('modal_active');
        }
    }
}

// render(data?: Partial<IViewModal>): HTMLElement {
//     if (!this._titleElement) {
//         this.initElements();
//     }
//     return super.render(data);
// }