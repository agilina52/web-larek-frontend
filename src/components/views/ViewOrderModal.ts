import { EventEmitter } from '../base/events';
import { Component } from '../base/components';
import { ensureElement } from '../../utils/utils';
interface IViewOrderModal {
    form: HTMLFormElement;
}
export class ViewOrderModal extends Component<IViewOrderModal> {
    protected _order: HTMLFormElement;
    protected _inputAddress: HTMLInputElement;
    protected _cardButton: HTMLButtonElement;
    protected _cashButton: HTMLButtonElement;
    protected _submitButton: HTMLButtonElement;
    private _isPaymentSelected: boolean;

    constructor(container: HTMLTemplateElement, protected events: EventEmitter) {
        super(container);

        this._order = ensureElement<HTMLFormElement>('.order', container);
        this._cardButton = ensureElement<HTMLButtonElement>(
            '[name="card"]',
            container
        );
        this._cashButton = ensureElement<HTMLButtonElement>(
            '[name="cash"]',
            container
        );
        this._inputAddress = ensureElement<HTMLInputElement>(
            '[name="address"]',
            container
        );

        this._submitButton = ensureElement<HTMLButtonElement>(
            'button[type=submit]',
            container
        );
        console.log(this._submitButton);

        this._cardButton.addEventListener('click', () => {
            this.setPaymentMethod('card');
            console.log('выбрали тип оплаты онлайн');
            events.emit('inputUser:changed', {
                field: 'payment',
                value: 'card',
            });
            this.updateSubmitButtonState();
        });

        this._cashButton.addEventListener('click', () => {
            this.setPaymentMethod('cash');
            console.log('выбрали тип оплаты при получении');
            events.emit('inputUser:changed', {
                field: 'payment',
                value: 'cash',
            });
            this.updateSubmitButtonState();
        });

        this._inputAddress.addEventListener('input', () => {
            console.log('вводим адрес доставки', this._inputAddress.value);
            events.emit('inputUser:changed', {
                field: 'address',
                value: this._inputAddress.value,
            });
        });

        this._submitButton.addEventListener('click', (e) => {
            console.log('_submitButton.addEventListener');
            e.preventDefault();

            if (this.isFormValid()) {
                console.log('нажали кнопку Далее');
                this.events.emit('order:proceed');
            }
        });
    }

    setPaymentMethod(method: 'card' | 'cash'): void {
        this._cardButton.classList.toggle('button_alt-active', method === 'card');
        this._cashButton.classList.toggle('button_alt-active', method === 'cash');
        this._isPaymentSelected = true;
    }

    private updateSubmitButtonState(): void {
        const isValid = this.isFormValid();
        this._submitButton.disabled = !isValid;
        this._submitButton.classList.toggle('button_disabled', !isValid);
    }

    private isFormValid(): boolean {
        return this._isPaymentSelected && this._inputAddress.value.trim() !== '';
    }
}
