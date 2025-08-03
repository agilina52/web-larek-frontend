import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";


interface IViewPage {
    catalog: HTMLElement[];
    counter: number;
}

export class ViewPage extends Component<IViewPage> {
    protected productContainer: HTMLElement;
    protected counterElement: HTMLElement; // Элемент для отображения счётчика

    constructor(container: HTMLElement) {
        super(container);

        this.productContainer = ensureElement('.gallery', this.container);
        // this.counterElement = ensureElement('.header__basket-counter', container); // Элемент счётчика
    }

    set catalog(items: HTMLElement[]){
        this.productContainer.replaceChildren(...items);
    }
}