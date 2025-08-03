// генерируемые события 
// productCardAdd:click - добавление продукта в корзину 
// productCardRem:click - удаление из корзины
//всю наследуется от базового класса modal

import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";

interface IViewModal {
    image: string,
    category: string,
    title: string,
    description: string,
    price: string,
    buttonText: HTMLButtonElement
}

export class ViewProductModal extends Component<IViewModal> {

    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _isActive: boolean;

    constructor(container: HTMLElement) {
        super(container);
        this._isActive = false;

        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._description = ensureElement<HTMLElement>('.card__text', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
        this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this._category = ensureElement<HTMLElement>('.card__category_other', this.container);
        
    }

    set isActive(value: boolean) {
        this._isActive = value;
        if (value) {
            this.container.classList.add('modal_active')
        } else {
            this.container.classList.remove('modal_active');
        }
    }

    get isActive(): boolean {
        return this.isActive;
    }

    openModal(): void {
        this.isActive = true;
    }

    closeModal(): void {
        this.isActive = false;
    }
render(data?: Partial<IViewModal>): HTMLElement {
        if (data) {
            if (data.title) this._title.textContent = data.title;
            if (data.description) this._description.textContent = data.description;
            if (data.price) this._price.textContent = data.price;
            if (data.image) this._image.src = data.image;
            if (data.category) this._category.textContent = data.category;
            if (data.buttonText) this._button.textContent = data.buttonText.textContent;
        }
        return this.container;
    }
}
