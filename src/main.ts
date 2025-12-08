import "./scss/styles.scss";

import { Products } from "./components/Models/Products";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { CardCatalog } from "./components/view/cards/CardCatalog";
import { CardPreview } from "./components/view/cards/CardPreview";
import { CardBasket } from "./components/view/cards/CardBasket";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { WebLarekApi } from "./components/api/wed-api";
import { API_URL } from "./utils/constants";
import { BasketForm } from "./components/view/forms/Basketform";
import { Header } from "./components/view/Header";
import { Gallery } from "./components/view/Gallery";
import { Modal } from "./components/view/modals/modals";
import { Success } from "./components/view/forms/Success";
import { Order } from "./components/view/forms/Order";
import { Contacts } from "./components/view/forms/Contacts";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { IProduct } from "./types";

// Инициализация событий
const events = new EventEmitter();

// Модели
const products = new Products(events);
const basket = new Basket(events);
const buyer = new Buyer(events);

// API
const api = new WebLarekApi(new Api(API_URL));

// Шаблоны
const templateCatalog = ensureElement<HTMLTemplateElement>("#card-catalog");
const templatePreview = ensureElement<HTMLTemplateElement>("#card-preview");
const templateBasketItem = ensureElement<HTMLTemplateElement>("#card-basket");
const templateBasket = ensureElement<HTMLTemplateElement>("#basket");
const templateOrder = ensureElement<HTMLTemplateElement>("#order");
const templateContacts = ensureElement<HTMLTemplateElement>("#contacts");
const templateSuccess = ensureElement<HTMLTemplateElement>("#success");

// Вью-компоненты
const header = new Header(events, ensureElement(".header"));
const gallery = new Gallery(ensureElement(".gallery"));
const modal = new Modal(events, ensureElement("#modal-container"));
const basketForm = new BasketForm(cloneTemplate(templateBasket), events);
const order = new Order(cloneTemplate(templateOrder), events);
const contacts = new Contacts(cloneTemplate(templateContacts), events);
const success = new Success(cloneTemplate(templateSuccess), events);

// ============ ОБРАБОТЧИКИ СОБЫТИЙ ============

// Закрытие модального окна
events.on("modal:request-close", () => {
  modal.close();
});

// Каталог
events.on("catalog:changed", (data: { items: IProduct[] }) => {
  const cards = data.items.map((product) => {
    const node = cloneTemplate(templateCatalog);
    const card = new CardCatalog(node, {
      onClick: () => events.emit("card:selected", { id: product.id }),
    });
    return card.render(product);
  });

  gallery.items = cards;
});

events.on("card:selected", (data: { id: string }) => {
  products.setPreview(data.id);
});

// Preview товара
events.on("catalog:preview", () => {
  const product = products.getPreview();
  if (!product) return;

  const node = cloneTemplate(templatePreview);
  const inCart = basket.contains(product.id);

  const card = new CardPreview(node, {
    onClick: () => events.emit("preview:action", { id: product.id }),
  });

  const buttonText =
    product.price === null ? "Недоступно" : inCart ? "Удалить" : "В корзину";

  const buttonDisabled = product.price === null;

  modal.content = card.render({
    ...product,
    buttonText,
    buttonDisabled,
  } as any);

  modal.open();
});

// Добавление/удаление из корзины
events.on("preview:action", (data: { id: string }) => {
  const product = products.getById(data.id);
  if (!product) return;

  if (basket.contains(data.id)) {
    basket.remove(data.id);
  } else {
    basket.add(product);
  }

  modal.close();
});

// Обновление корзины
events.on("cart:changed", () => {
  header.counter = basket.getCount();
  renderBasket();
});

// Открытие корзины
events.on("basket:open", () => {
  modal.content = basketForm.render({});
  modal.open();
});

events.on("cart:item:remove", (data: { id: string }) => {
  basket.remove(data.id);
});

// Оформление заказа
events.on("cart:checkout", () => {
  modal.content = order.render({});
  modal.open();
});

// Данные покупателя
events.on("order:payment", (data: { field: string; value: string }) => {
  buyer.setData({ payment: data.value as any });
});

events.on("order:address", (data: { field: string; value: string }) => {
  buyer.setData({ address: data.value });
});

events.on("order:submit", () => {
  modal.content = contacts.render({});
});

events.on("contacts:email", (data: { email: string }) => {
  buyer.setData({ email: data.email });
});

events.on("contacts:phone", (data: { phone: string }) => {
  buyer.setData({ phone: data.phone });
});

// Валидация формы
events.on("buyer:changed", (data: any) => {
  const errors = buyer.validate();

  order.render({
    payment: data?.payment || "",
    address: data?.address || "",
    error: errors.payment || errors.address || "",
    valid: !errors.payment && !errors.address,
  } as any);

  contacts.render({
    email: data?.email || "",
    phone: data?.phone || "",
    error: errors.email || errors.phone || "",
    valid: !errors.email && !errors.phone,
  } as any);
});

// Отправка заказа
events.on("contacts:submit", () => {
  const buyerData = buyer.getData();
  const orderData = {
    ...buyerData,
    total: basket.getTotal(),
    items: basket.getItems().map((item) => item.id),
  };

  api
    .createOrder(orderData)
    .then((result) => {
      basket.clear();
      buyer.clear();

      modal.content = success.render({
        description: `Списано ${result.total} синапсов`,
      } as any);

      modal.open();
    })
    .catch((error: Error) => {
      console.error("Ошибка создания заказа:", error);

      contacts.render({
        error: error.message || "Не удалось оформить заказ. Попробуйте позже.",
        valid: false,
      } as any);
    });
});

// Закрытие окна успеха
events.on("success:close", () => modal.close());

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============

// Рендер корзины
function renderBasket(): void {
  const items = basket.getItems();

  const cards = items.map((product, index) => {
    const node = cloneTemplate(templateBasketItem);
    const card = new CardBasket(node, {
      onDelete: () => events.emit("cart:item:remove", { id: product.id }),
    });

    return card.render({
      ...product,
      index: index + 1,
    } as any);
  });

  basketForm.items = cards;
  basketForm.total = basket.getTotal();
  basketForm.empty = cards.length === 0;
}

// ============ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ============

// Загрузка товаров
api
  .getProducts()
  .then((list) => {
    products.setProducts(list.items);
    events.emit("catalog:changed", { items: list.items });
  })
  .catch((error) => {
    console.error("Ошибка загрузки каталога:", error);
  });

// Первоначальный рендер корзины
renderBasket();
