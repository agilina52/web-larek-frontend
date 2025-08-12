//itemProduct:delete -  1 событие удаления продукта из корзины
//resumeCart:click -  2 событие продолжения оформления заказа

import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";

interface IViewCartModal {
    // orderButton: HTMLButtonElement;  это элемент управления , а не даннеы, в интерфейсе его не нужно указывать
    totalPrice: HTMLElement;
    products: HTMLElement[];
    listElement: HTMLElement;

    // items: HTMLElement[];
    // total: number;
    // selected: string[];
}
export class ViewCartModal extends Component<IViewCartModal> {
    protected _orderButton: HTMLButtonElement;
    protected _totalPrice: HTMLElement;
    protected _listElement: HTMLElement;
    protected _products: IProduct[] = [];

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.initElements();
    }

    protected initElements() {
        this._orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this._totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);
        this._listElement = ensureElement<HTMLElement>('.basket__list', this.container);

        this._orderButton.addEventListener('click', () => {
            this.events.emit('cart:order');
        });

        this._listElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('basket__item-delete')) {
                const itemElement = target.closest('.basket__item');
                const productId = itemElement?.getAttribute('data-id');
                if (productId) {
                    this.events.emit('product:remove', { id: productId })
                }
            }
        });
        
    }

    //    метод для обновления списка товаров
    set products(items: HTMLElement[]) {
        // this._products = items;
        // console.log(items);
        this._listElement.textContent = '';
        items.forEach(item => {
            this._listElement.appendChild(item);
        })
    }
}