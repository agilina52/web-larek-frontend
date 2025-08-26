import { IOrder, IProduct, TOrderPayment } from './types/index';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { WebLarekAPI } from './components/WebLarekAPI';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CDN_URL, API_URL } from './utils/constants';
import { ViewPage } from './components/views/ViewPage';
import { ViewProductItem } from './components/views/ViewProductItem';
import { ViewCartProductItem } from './components/views/ViewCartProductItem';
import { ViewModal } from './components/views/ViewModal';
import { ViewProductModal } from './components/views/ViewProductModal';
import { ViewCartModal } from './components/views/ViewCartModal';
import { ViewOrderModal } from './components/views/ViewOrderModal';
import { ViewOrderContactModal } from './components/views/ViewOrderContactModal';
import { ViewSuccessModal } from './components/views/ViewSuccessModal';
import { ModelProductList } from './components/models/ModelProductList';
import { ModelCart } from './components/models/ModelCart';
import { ModelOrder } from './components/models/ModelOrder';

const events = new EventEmitter();
const productList = new ModelProductList(events);
const api = new WebLarekAPI(CDN_URL, API_URL);

const page = new ViewPage(ensureElement<HTMLElement>('.page'), events);
const itemTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const previewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const modal = new ViewModal(ensureElement<HTMLElement>('.modal'));
const productModal = new ViewProductModal(cloneTemplate(previewTemplate), events);
const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cartModal = new ViewCartModal(cloneTemplate(cartTemplate), events);
const modelCart = new ModelCart(events);
const cartItemsTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const formTemplate = document.querySelector('#order') as HTMLTemplateElement;
const formOrder = new ViewOrderModal(cloneTemplate(formTemplate), events);
const formContactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const formContacts = new ViewOrderContactModal(cloneTemplate(formContactsTemplate), events);
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;
const successModal = new ViewSuccessModal(cloneTemplate(successTemplate), events);
const modelOrder = new ModelOrder(events);

function getCartProductList(): HTMLElement[] {
    const items = modelCart.getItems();
    return items.map((item, index) =>
        new ViewCartProductItem(cloneTemplate(cartItemsTemplate), events).render({ product: item, counter: index + 1 }));
}

// получение продуктов с сервера 
api.getProductList()
    .then((items) => {
        productList.setItems(items);
    })
    .catch((err) => {
        console.error('Ошибка:', err);
    });

// отрисовка страницы с карточками продуктов
events.on('items:changed', () => {
    const itemsHTMLArray = productList.getItems().map(item =>
        new ViewProductItem(cloneTemplate(itemTemplate), events).render({ product: item }))
    page.render({
        catalog: itemsHTMLArray,
    });
})

events.on('item:click', ({ id }: { id: string }) => {
    const productData = productList.getItemById(id);
    if (!productData) return;
    const idElement = modelCart.hasItem(id);
    const productElement = productModal.render({
        product: productData,
        selectedCart: idElement
    });
    modal.open(productElement);
});

events.on('cart:add-item', (product: IProduct) => {
    modelCart.addCart(product);
    cartModal.render({
        products: getCartProductList(),
        total: modelCart.getTotal()
    })
    page.render({
        counter: modelCart.getTotalCount()
    });
});

events.on('cart:open', () => {
    modal.open(cartModal.render());
});

events.on('cart:delete-item', ({ id }: { id: string }) => {
    modelCart.deleteCart(id);
    cartModal.render({
        products: getCartProductList(),
        total: modelCart.getTotal()
    })
    page.render({
        counter: modelCart.getTotalCount()
    });
})

events.on('cart:order', () => {
    modal.render({
        content: formOrder.render()
    });
})

events.on('order:proceed', () => {
    modal.render({
        content: formContacts.render()
    })
})

events.on('finish:click', () => {
    const order = {
        ...modelOrder.getOrder(),
        items: modelCart.getItems().map(item => item.id),
        total: modelCart.getTotal()
    } as IOrder;
    formContacts.isLoading(true);
    api.pushOrder(order)
        .then((data) => {
            modelCart.clearCart();
            modelOrder.clearOrder();
            modal.render({
                content: successModal.render({
                    totalPrice: data.total
                })
            })
        })
        .catch((err) => {
            console.error('Ошибка:', err);
        })
        .finally(() => {
            formContacts.isLoading(false);
            page.render({
                counter: modelCart.getTotalCount()
            });
        });
})

events.on('closes:click', () => {
    modal.close();
})

events.on('inputUser:changed', ({ field, value }: { field: string, value: string }) => {
    switch (field) {
        case 'email':
            return modelOrder.setEmail(value);

        case 'phone':
            return modelOrder.setPhone(value);

        case 'address':
            return modelOrder.setAddress(value);

        case 'payment':
            return modelOrder.setPayment(value as TOrderPayment);

        default:
            return 'Неизвестный тип поля';
    }
})