import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { ensureElement } from '../../utils/utils';
interface IViewSuccessModal {
    totalPrice: number;
    image: string;
}
export class ViewSuccessModal extends Component<IViewSuccessModal> {
    protected _form: HTMLFormElement;
    protected _image: string;
    protected _totalPrice: HTMLElement;
    protected _buttonClose: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.initElements();
        this.initEventListeners();
    }

    protected initElements() {
        this._buttonClose = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this._totalPrice = ensureElement<HTMLElement>('.order-success__description', this.container);
    }

    protected initEventListeners() {
        this._buttonClose.addEventListener('click', () => {
            console.log('За новыми покупками');
            this.events.emit('closes:click');
        });
    }

    set totalPrice(value: string) {
        this.setText(this._totalPrice, `Списано ${value} синапсов`);
    }
}