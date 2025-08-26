import { ensureElement } from '../../utils/utils';
import { Component } from '../base/components';
import { IProduct } from '../../types';
import { IEvents } from '../base/events';
interface IViewProductModal {
	image: string;
	category: string;
	title: string;
	description: string;
	price: number;
	product: IProduct;
	selectedCart: boolean;
}
export class ViewProductModal extends Component<IViewProductModal> {
	protected _imageElement: HTMLImageElement;
	protected _categoryElement: HTMLElement;
	protected _titleElement: HTMLElement;
	protected _descriptionElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;
	protected _isActive: boolean;
	protected _product: IProduct;
	protected _selectedCart: boolean;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._selectedCart = false;
		this.initElements();
	}

	protected initElements() {
		this._titleElement = ensureElement<HTMLElement>(
			'.card__title',
			this.container
		);
		this._descriptionElement = ensureElement<HTMLElement>(
			'.card__text',
			this.container
		);
		this._priceElement = ensureElement<HTMLElement>(
			'.card__price',
			this.container
		);
		this._imageElement = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);
		this._categoryElement = ensureElement<HTMLElement>(
			'.card__category',
			this.container
		);
		this._buttonElement = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.container
		);

		this._buttonElement.addEventListener('click', () => {
			if (this._selectedCart) {
				this.selectedCart = false;
				this.events.emit('cart:delete-item', this._product);
			} else {
				this.selectedCart = true;
				this.events.emit('cart:add-item', this._product);
			}
		});
	}

	set product(value: IProduct) {
		this._product = value;
		if (!this._titleElement) return;
		this._titleElement.textContent = value.title;
		this._descriptionElement.textContent = value.description;
		this._priceElement.textContent = `${value.price} синапсов`;
		this._imageElement.src = value.image;
		this._imageElement.alt = value.title;
		this._categoryElement.textContent = value.category;

		this._categoryElement.classList.remove(
			'card__category_soft',
			'card__category_hard',
			'card__category_other',
			'card__category_additional',
			'card__category_button'
		);

		this._categoryElement.textContent = value.category;
		if (value.category === 'софт-скил') {
			this._categoryElement.classList.add('card__category_soft');
		} else if (value.category === 'хард-скил') {
			this._categoryElement.classList.add('card__category_hard');
		} else if (value.category === 'другое') {
			this._categoryElement.classList.add('card__category_other');
		} else if (value.category === 'дополнительное') {
			this._categoryElement.classList.add('card__category_additional');
		} else if (value.category === 'кнопка') {
			this._categoryElement.classList.add('card__category_button');
		}

		this._priceElement.textContent = value.price
			? value.price + ' синапсов'
			: 'Бесценно';
		if (value.price === null) {
			this._buttonElement.classList.add('disabled');
			this._buttonElement.setAttribute('disabled', 'true');
			this._buttonElement.textContent = 'Недоступно';
		} else {
			this._buttonElement.textContent = 'Купить';
			this._buttonElement.classList.remove('disabled');
			this._buttonElement.removeAttribute('disabled');
		}
	}

	set selectedCart(value: boolean) {
		this._selectedCart = value;
		if (this._product.price === null) {
			this._buttonElement.classList.add('disabled');
			this._buttonElement.setAttribute('disabled', 'true');
			this._buttonElement.textContent = 'Недоступно';
		} else {
			this._buttonElement.textContent = this._selectedCart
				? 'Убрать из корзины'
				: 'Купить';
		}
	}
}
