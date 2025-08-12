import { EventEmitter } from '../base/events';
import { Component } from '../base/components';
import { ensureElement } from '../../utils/utils';

interface IViewOrderContactModal {
    form: HTMLFormElement;
}

export class ViewOrderContactModal extends Component<IViewOrderContactModal> {
    protected _inputEmail: HTMLInputElement;
    protected _inputPhone: HTMLInputElement;
    protected _submitButton: HTMLButtonElement;

    constructor(container: HTMLTemplateElement, protected events: EventEmitter) {
        super(container);

        this._inputEmail = ensureElement<HTMLInputElement>('[name="email"]', container);
        this._inputPhone = ensureElement<HTMLInputElement>('[name="phone"]', container);
        this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
        
        // Инициализация состояния кнопки
        // this.updateSubmitButtonState();

        this._inputEmail.addEventListener('input', () => {
            console.log('вводим адрес доставки');
            events.emit('inputUser:changed', {
                field: 'email',
                value: this._inputEmail.value,
            });
            this.updateSubmitButtonState();
        });
        this._inputPhone.addEventListener('input', () => {
            console.log('вводим адрес доставки');
            events.emit('inputUser:changed', {
                field: 'phone',
                value: this._inputPhone.value,
            });
            this.updateSubmitButtonState();
        });
        this._submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.isFormValid()) {
                console.log('нажали кнопку Оплатить');
                this.events.emit('finish:click');
            }
        });
    }

    // дополнила
    private updateSubmitButtonState(): void {
        const isValid = this.isFormValid();
        this._submitButton.disabled = !isValid;
        this._submitButton.classList.toggle('button_disabled', !isValid);
    }


    private isFormValid(): boolean {
        const emailValid = this._inputEmail.value.trim() !== '';
        const phoneValid = this._inputPhone.value.trim() !== '';
        return emailValid && phoneValid;
    }
}