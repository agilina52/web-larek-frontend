import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";
interface IViewPage {
    catalog: HTMLElement[];
    counter: number;
}
export class ViewPage extends Component<IViewPage> {
    protected productContainer: HTMLElement;
    protected counterElement: HTMLElement; // Элемент для отображения счётчика
    protected cartButtonElement: HTMLButtonElement;
    protected _wrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.productContainer = ensureElement<HTMLElement>('.gallery', this.container);
        this.cartButtonElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement('.header__basket-counter', this.container); // Элемент счётчика
        this.cartButtonElement.addEventListener('click', () => {
            this.events.emit('cart:open');
            console.log('открыли баскет')
        })
    }

    set catalog(items: HTMLElement[]) {
        this.productContainer.replaceChildren(...items);
    }
    set counter(count: number) {
        this.counterElement.textContent = count.toString();
    }
}