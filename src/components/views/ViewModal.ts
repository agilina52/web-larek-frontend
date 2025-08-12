import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";

interface IViewModal {
    content: HTMLElement;
}
export class ViewModal extends Component<IViewModal> {
    // export class ViewModal {

    protected readonly modalView;
    protected _modalContent: HTMLElement;
    protected _closeButton: HTMLButtonElement;
    protected _addToCartButton: HTMLButtonElement;
    // protected _content: HTMLElement;

    constructor(container: HTMLElement) {
        super(container)

        this.modalView = container;
        this._modalContent = ensureElement<HTMLElement>('.modal__content', this.modalView);
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close');

        this._closeButton.addEventListener('click', this.close.bind(this));
    }

    set content(content: HTMLElement) {
        this._modalContent.innerHTML = '';
        this._modalContent.replaceChildren(content);
    }

    open(element?: HTMLElement) {
        this.content = null;
        this.modalView.classList.add('modal_active');
        if (element) this.content = element;
    }

    close() {
        this.modalView.classList.remove('modal_active');
        this._modalContent.textContent = '';
    }

    render(data?: any) {
        super.render(data)
        return this.container
    }
}

