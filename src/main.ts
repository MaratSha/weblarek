import './scss/styles.scss';

import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { CardCatalog } from './components/view/cards/CardCatalog';
import { CardPreview } from './components/view/cards/CardPreview';
import { CardBasket } from './components/view/cards/CardBasket';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { WebLarekApi } from './components/api/wed-api';
import { API_URL } from './utils/constants';
import { Basket as BasketView } from './components/view/Basket';
import { Header } from './components/view/Header';
import { Gallery } from './components/view/Gallery';
import { Modal } from './components/view/modals/modals';
import { Success } from './components/view/Success';
import { Order } from './components/view/forms/Order';
import { Contacts } from './components/view/forms/Contacts';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IProduct, IBuyer, ICardData, IOrderFormData, IContactsFormData, ISuccessData } from './types';

// Инициализация событий
const events = new EventEmitter();

// Модели
const products = new Products(events);
const basket = new Basket(events);
const buyer = new Buyer(events);

// API
const api = new WebLarekApi(new Api(API_URL));

// Шаблоны
const templateCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templatePreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateBasketItem = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');

// Вью-компоненты
const header = new Header(events, ensureElement('.header'));
const gallery = new Gallery(ensureElement('.gallery'));
const modal = new Modal(events, ensureElement('#modal-container'));
const basketView = new BasketView(cloneTemplate(templateBasket), events);
const order = new Order(cloneTemplate(templateOrder), events);
const contacts = new Contacts(cloneTemplate(templateContacts), events);
const success = new Success(cloneTemplate(templateSuccess), events);

// ============ ОБРАБОТЧИКИ СОБЫТИЙ ============

// Закрытие модального окна
events.on('modal:request-close', () => {
    modal.close();
});

// Каталог
events.on('catalog:changed', () => { 
    const items = products.getItems(); 
    
    const cards = items.map(product => { 
        const node = cloneTemplate(templateCatalog); 
        
        const card = new CardCatalog(node, { 
            onClick: () => {
                events.emit('card:selected', { id: product.id });
            }
        }); 
        
        return card.render(product);
    }); 
    
    gallery.render({ items: cards });
});

events.on('card:selected', (data: { id: string }) => {
    const product = products.getItemById(data.id);
    if (product) {
        products.setItem(product);
    }
});

// Preview товара
events.on('catalog:preview', (data: { selectedItem: IProduct }) => {
    const product = data.selectedItem;
    if (!product) return;
    const node = cloneTemplate(templatePreview);
    const inCart = basket.checkItemById(product.id);

    const card = new CardPreview(node, {
        onClick: () => events.emit('preview:action', { id: product.id })
    });

    const buttonText = product.price === null 
        ? 'Недоступно' 
        : inCart ? 'Удалить из корзины' : 'В корзину';
    
    const buttonDisabled = product.price === null;

    const renderedCard = card.render({
        ...product,
        buttonText,
        buttonDisabled
    } as ICardData);
    
    modal.render({ content: renderedCard });
});

// Добавление/удаление из корзины
events.on('preview:action', (data: { id: string }) => {
    const product = products.getItemById(data.id);
    if (!product) return;

    if (basket.checkItemById(data.id)) {
        basket.removeItem(product);
    } else {
        basket.addItem(product);
    }
    
    modal.close();
});

// Обновление корзины
events.on('cart:changed', () => {
    header.counter = basket.getItemsTotal();
    renderBasket();
});

// Открытие корзины
events.on('basket:open', () => {
    modal.render({ content: basketView.render({}) });
});

events.on('cart:item:remove', (data: { id: string }) => {
    const product = basket.getBasketItems().find(item => item.id === data.id);
    if (product) {
        basket.removeItem(product);
    }
});

// Оформление заказа
events.on('cart:checkout', () => {
    modal.render({ content: order.render({}) });
});

// Данные покупателя
events.on('order:payment', (data: { field: string; value: string }) => {
    buyer.setData({ payment: data.value as any });
});

events.on('order:address', (data: { field: string; value: string }) => {
    buyer.setData({ address: data.value });
});

events.on('order:submit', () => {
    modal.render({ content: contacts.render({}) });
});

events.on('contacts:email', (data: { email: string }) => {
    buyer.setData({ email: data.email });
});

events.on('contacts:phone', (data: { phone: string }) => {
    buyer.setData({ phone: data.phone });
});

// Валидация формы
events.on('buyer:changed', (data: unknown) => {
    const buyerData = data as IBuyer;
    const errors = buyer.validateData();
    
    order.render({
        payment: buyerData?.payment || '',
        address: buyerData?.address || ''
    } as IOrderFormData);
    
    order.valid = !errors.payment && !errors.address;
    order.errors = [
        errors.payment ?  errors.payment : '',
        errors.address ? errors.address : ''
    ].filter(msg => msg).join(', ');

    contacts.render({
        email: buyerData?.email || '',
        phone: buyerData?.phone || ''
    } as IContactsFormData);
    
    contacts.valid = !errors.email && !errors.phone;
    contacts.errors = [
        errors.email ? errors.email : '',
        errors.phone ? errors.phone : ''
    ].filter(msg => msg).join(', ');
});

// Отправка заказа
events.on('contacts:submit', () => {
    const buyerData = buyer.getData();
    const orderData = {
        ...buyerData,
        total: basket.getTotalPrice(),
        items: basket.getBasketItems().map(item => item.id)
    };

    api.createOrder(orderData)
        .then((result) => {
            basket.emptyBasket();
            buyer.clearData();
            
            modal.render({
                content: success.render({
                    description: `Списано ${result.total} синапсов`
                } as ISuccessData)
            });
        })
        .catch((error: Error) => {
            contacts.errors = error.message || 'Не удалось оформить заказ. Попробуйте позже.';
            contacts.valid = false;
        });
});

// Закрытие окна успеха
events.on('success:close', () => modal.close());

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============

// Рендер корзины
function renderBasket(): void {
    const items = basket.getBasketItems();
    
    const cards = items.map((product, index) => {
        const node = cloneTemplate(templateBasketItem);
        const card = new CardBasket(node, {
            onDelete: () => events.emit('cart:item:remove', { id: product.id })
        });
        
        return card.render({ 
            ...product, 
            index: index + 1 
        } as ICardData);
    });

    basketView.items = cards;
    basketView.total = basket.getTotalPrice();
    basketView.empty = cards.length === 0;
}

// ============ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ============

// Загрузка товаров
api.getProducts()
    .then((list) => {
        products.setItems(list.items);
        events.emit('catalog:changed');
    })
    .catch((error) => {
        console.error('Ошибка загрузки каталога:', error);
    });

// Первоначальный рендер корзины
renderBasket();