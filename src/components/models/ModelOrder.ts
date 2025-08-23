import { IOrder as IModelOrder, TOrderPayment } from "../../types";
import { EventEmitter } from "../base/events";

// interface IModelOrder extends IOrder;
export class ModelOrder {
    protected _order: IModelOrder;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this._order = {
            payment: null,
            address: '',
            email: '',
            phone: '',
            total: 0,
            items: []
        };
        this.events = events;
    }

    // Устанвливаем способ оплаты
    setPayment(method: TOrderPayment): void {
        this._order.payment = method;
        this.events.emit('order.payment:changed', { payment: method });
    }

    // Устанавливаем адрес доставки
    setAddress(address: string): void {
        this._order.address = address;
        this.events.emit('order.address:changed', { address });
    }

    // Устанавливаем email
    setEmail(email: string): void {
        this._order.email = email;
        this.events.emit('order.email:changed', { email });
    }

    // Устанавливаем телефон
    setPhone(phone: string): void {
        this._order.phone = phone;
        this.events.emit('order.phone:changed', { phone });
    }

    // Метод для обновления данных заказа
    setOrder(data: Partial<IModelOrder>): void {
        this._order = {
            ...this._order,
            ...data
        };
        this.events.emit('order:changed', this._order);
    }
    // Метод для получения текущего заказа
    getOrder(): IModelOrder {
        return this._order;
    }
    // Метод валидации заказа
    validateOrder(): boolean {
        return !!this._order.payment &&
            this._order.address.trim().length > 0 &&
            this._order.email.trim().length > 0 &&
            this._order.phone.trim().length > 0;
    }

    // Метод очистки заказа
    clearOrder(): void {
        this._order = {
            payment: null,
            address: '',
            email: '',
            phone: '',
            total: 0,
            items: []
        };
    }
}