import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { WebLarekAPI } from './components/WebLarekAPI';
import { ModelProductList } from './components/models/ModelProductList';
import { ViewPage } from './components/views/ViewPage';
import { ViewProductItem } from './components/views/ViewProductItem';
import { cloneTemplate, ensureElement } from './utils/utils';
// import { ModelCart } from './components/models/ModelCart';

const events = new EventEmitter();
const productList = new ModelProductList(events) // создаем экземпляр класса ModelProductList
const api = new WebLarekAPI('https://larek-api.nomoreparties.co');
// const page = new ViewPage(document.querySelector('.page') as HTMLElement);
const itemTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const page = new ViewPage(ensureElement<HTMLElement>('.page'));

// 1 получение продуктов с сервера через экземпляр класса api и размещения их в ModalProductList

api.getProductList()
    .then((data) => {
        productList.setItems(data.items); // вызываем метод экземпляра
        console.log(data);
    })
    .catch((err) => {
        console.error('Ошибка:', err);
    });

// 2 отрисовка страницы с карточками продуктов

events.on('items:changed', () => {
    const itemsHTMLArray = productList.getItems().map(item =>
        new ViewProductItem(cloneTemplate(itemTemplate), events).render({product: item}))
    page.render({
        catalog: itemsHTMLArray,
    });
})

events.on('item:click', ({ id }: { id: string }) => {
    const product = productList.getItemById(id);
    if (product) {
        console.log("Открываем карточку продукта", product.title);
        console.log("ID получен:", id);
        console.log("Найденный продукт:", product);
        // events.emit('modal:open', product);
    }
})



// 3 обработка события нажатия на карточку. В событии должны быть сведения по нажатой карточке (информация по id карточке)


// 4 прослушивать через eventemitter события добавления продукта в корзину
// и вызывать соотв. методы в ModelCart
// 5 вешаем прослушивать на оформление заказа
// 6 подписываемся на события оформленный заказ

// // РЕАЛИЗАЦИЯ!!!
// //  (из видео к ПР)
// // все кусочки кода нужно будет разместить в своиъ файл и с нужным наименованием в моем проекте

// //у нас есть корзина товаров, которая хранит в себе строки товара и их количеством (можно менять кол-во).
// // Эту задачу можно решить интерфейсом внизу (подставив свои данные)
// // add|remove пользователь может добавлять и удалять товар
// // не забываем создавать соответствующие проверки: был ли ранее добавлен такой товар; или не удаляем ли товар в минус
// // предусматривается в коде методов
// interface IBasketModel {
//     items: Map<string, number>;
//     add(id: string): void;
//     remove(id: string): void;
// }

// // реализация в классе.

// // class BasketModel implements IBasketModel {
// //     items: Map<string, number> = new Map();

// //     add(id: string): void {
// //         if (!this.items.has(id)) this.items.set(id, 0); // создаем новый
// //         this.items.set(id, this.items.get(id)! + 1); // прибавляем количество
// //     }
// //     remove(id: string): void {
// //         if (!this.items.has(id)) return; // если нет, то и делать с ним нечего
// //         if (this.items.get(id)! > 0) { // если есть и больше ноля, то...
// //             this.items.set(id, this.items.get(id)! - 1); // уменьшаем
// //             if (this.items.get(id) === 0) this.items.delete(id); // если опустили до ноля, то удаляем
// //         }
// //     }
// // }

// // ИЛИ используя событийно ориентированный подход. Модифицируем код.
// // Используется метод _changed, который вызывается при любом изменении количества товара.
// // Данный метод содержит в себе команду инициацизации события - basket:change

// class BasketModel implements IBasketModel {
//     constructor(protected events: IEventEmitter) { }

//     add(id: string): void {
//         // ...
//         this._changed();
//     }
//     remove(id: string): void {
//         this._changed();
//     }

//     protected _changed() { // метод, генерирующий уведомлениие об изменении
//         this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
//     }
// }

// // реакция на события выполняется презентором.
// // к событию basket:change прикрепить обработчик, этот обработчик будет получать данные,
// // которые передаются из события и дальше выполнять действия

// const events = new EventEmitter();
// const basket = new BasketModel(events);
// events.on('basket:change', (data: { items: string[] }) => {
//     // выводим куда-то
// })


// // в самой корзине не хранятся данные о продуктах, их нужно хранить отдельно
// // сделаем еще одну модель хранения данных о товарах

// //интерфейс товара
// interface Iproduct {
//     id: string;
//     title: string;
// }

// // интерфейс списка товара.
// // состояние приложения (техническая модель, не связанная с пользовательским сценарием) - см комменты ниже
// interface CatalogModel {
//     items: Iproduct[];
//     setItems(items: Iproduct[]): void; // чтобы установить после загрузки из апи
//     getProduct(id: string): Iproduct; // чтобы получить при рендере списков
// }

// // после реализации модели данных, переходим к реализации компонентов отображения (представления)
// // полуичть часть html и установить данные котоые к нам пришли.

// // обобщенный интерфейс:

// //интерфейс для конструктора.
// interface IViewConstructor {
//     new(container: HTMLElement, events?: IEventEmitter): IView; // на входе контейнер, в него будем выводить
// }
// // интерфейс для самого отображения
// interface IView {
//     render(data?: object): HTMLElement; // устанавливаем данные, возвращаем контейнер
// }

// // отображение отдельного товара в корзине:
// class BasketItemView implements IView {
//     // элементы внутри контейнера
//     protected title: HTMLScriptElement;
//     protected addButton: HTMLButtonElement;
//     protected removeButton: HTMLButtonElement;

//     // данные, которые хотим сохранить на будущее
//     protected id: string | null = null;

//     constructor(protected container: HTMLElement, protected events: IEventEmitter) {
//         // инициализируем, чтобы не искать повторно
//         this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
//         this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
//         this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;

//         // устанавливаем события
//         this.addButton.addEventListener('click', () => {
//             // генерируем событие в нашем брокере
//             this.events.emit('ui:basket-add', { id: this.id });
//         });

//         this.addButton.addEventListener('click', () => {
//             this.events.emit('ui:basket-remove', { id: this.id });
//         });
//     }

//     render(data: { id: string, title: string }) {
//         if (data) {
//             // если есть новые данные, то заполним их
//             this.id = data.id;
//             // и выведим в интерфейс
//             this.title.textContent = data.title;
//         }
//         return this.container;
//     }
// }

// // вся корзина целиком может  выглядеть таким образом
// class BasketView implements IView {
//     constructor(protected container: HTMLElement) { }
//     render(data: { items: HTMLElement[] }) {
//         if (data) {
//             this.container.replaceChildren(...data.items);
//         }
//         return this.container;
//     }
// }

// // всё нужно собрать (объединить)!!! используем брокер событий
// // инициализация
// const api = new ShopAPI();
// const events = new EventEmitter();
// const basketView = new BasketView(document.querySelector('.basket'));
// const basketModel = new BasketModel(events);
// const catalogModel = new CatalogModel(events);

// // можно собрать в функцию или классы отдельные экраны с логикой их формирования
// function renderBasket(items: string[]) {
//     basketView.render(
//         items.map(id => {
//             const itemView = new BasketItemView(events);
//             return itemView.render(catalogModel.getProduct(id));
//         })
//     );
// }

// // при изменении рендерим
// events.on('basket:change', (event: { items: string[] }) => {
//     renderBasket(event.items);
// });
// // при действиях изменениям модель, а  после этого случится рендер
// events.on('ui:basket-add', (event: { id: string }) => {
//     basketModel.add(event.id);
// });
// events.on('ui:basket-remove', (event: { id: string }) => {
//     basketModel.remove(event.id);
// });
// // подгружаем начальные данные и запускаем процессы
// api.getCatalog()
//     .then(catalogModel.setItem.bind(catalogModel))
//     .catch(err => console.error(err));