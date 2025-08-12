import { IProduct } from "../../types";
import { EventEmitter } from "../base/events";

interface IModelOrder {
    // product?: IProduct[];
    payment: 'card' | 'cash' | null;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: IProduct[]; // Массив товаров в заказе
    // valid: boolean; // Флаг валидности
    // описать сущности (способ оплаты, данные заказчика, адрес доставки и список продуктов, сумма заказа всего)
}
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
            // valid: false,
        };
        this.events = events;
    }

    // Устанвливаем способ оплаты
    setPayment(method: 'card' | 'cash'): void {
        this._order.payment = method;
        this.events.emit('order.payment:changed', { payment: method });
    }
    // Устанавливаем адрес доставки
    setAddress(address: string): void {
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

// Еще важное правило. Когда создаешь какое-то свойство в модели данных, спроси себя, а могу лия я где-то жто получить или посчитать из чего-то? Если Да, то не надо его создавать, надо считать.
// Например.
// Сумма всех купленных товаров, надо ли для нее делать свойство total? А можем ли мы где-то посчитать ее? Да, если взять массив товаров в basket и сложить все цены товаров.
// Значит НЕЛЬЗЯ делать total.
// 08:35
// Значит нужно создать метод, типа getTotal() который будет из корзины брать все товары и считать сумму покупки и return ее.
// Тогда в любом месте, где тебе понадобится сумма покупки ты просто будешь писать модель.getTotal() и получать эту сумму