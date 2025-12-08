# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Интернет-магазин «Web-Larёk»

«Web-Larёk» представляет собой современный интернет-магазин, разработанный специально для веб-разработчиков. Приложение предлагает полный цикл покупки товаров, начиная от просмотра каталога и заканчивая оформлением заказа с подтверждением.

Основная цель проекта — демонстрация передовых практик веб-разработки, включая использование событийно-ориентированной архитектуры, строгой типизации TypeScript и принципов чистого кода.

Приложение построено по паттерну MVP (Model-View-Presenter), что обеспечивает четкое разделение ответственности между компонентами и упрощает поддержку кода. Все взаимодействия между слоями осуществляются через систему событий, что делает архитектуру гибкой и масштабируемой.

## Архитектура приложения

В основе приложения лежит паттерн Model-View-Presenter (MVP), который был выбран для обеспечения чистого разделения обязанностей:

Model (Модель) — отвечает за хранение и управление данными. Включает в себя классы для работы с каталогом товаров, корзиной покупок и информацией о покупателе. Модели не содержат логики представления и не знают о том, как данные отображаются.

View (Представление) — отвечает за отображение данных пользователю. Состоит из UI-компонентов, таких как карточки товаров, формы ввода, модальные окна. Представления не содержат бизнес-логики и реагируют на действия пользователя, генерируя события.

Presenter (Презентер) — выступает в роли посредника между Моделью и Представлением. Обрабатывает события от обоих слоев, выполняет бизнес-логику, обновляет модели и представления соответствующим образом.

## Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от Component будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова render и записывать данные в необходимые DOM элементы.
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:
`baseUrl: string` - базовый адрес сервера
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.
`emit<T extends object>(event: string, data?: T): void`- инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные

### Переменные окружения и константы

**Файл src/utils/constants.ts**
- `API_URL` — базовый адрес API
- `CDN_URL` — базовый адрес CDN для картинок
- `categoryMap` — соответствия категорий модификаторам для UI

### Типы данных

Все типы и интерфейсы объявлены в файле: `src/types/index.ts`

**Интерфейсы**

- `ApiPostMethods` - `'POST' | 'PUT' | 'DELETE'` — допустимые методы при отправке данных на сервер

- `IApi`
  - `get<T>(uri: string): Promise<T>` — GET-запрос на uri, вернёт данные типа T
  - `post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>` — отправка data на uri (по умолчанию POST), вернёт данные типа T

- `IProduct` (товар)
  - `id: string` — уникальный идентификатор
  - `description: string` — описание
  - `image: string` — имя файла картинки на CDN
  - `title: string` — название товара
  - `category: string` — категория
  - `price: number | null` — цена в ₽; null — товар нельзя купить

- `IBuyer` (покупатель)
  - `payment: "card" | "cash" | ""` — способ оплаты
  - `email: string` — e-mail
  - `phone: string` — телефон
  - `address: string` — адрес

- `IOrderRequest` (данные для оформления заказа)
  - `payment: "card" | "cash" | ""` — способ оплаты
  - `email: string` — e-mail
  - `phone: string` — телефон  
  - `address: string` — адрес
  - `total: number` — сумма заказа
  - `items: string[]` — массив ID товаров

- `IOrderResponse`
  - `id: string` — идентификатор созданного заказа
  - `total: number` — сумма заказа

- `IErrorResponse`
  - `error: string` — сообщение об ошибке

- `IProductsResponse`
  - `total: number` — сколько всего товаров на сервере
  - `items: IProduct[]` — массив товаров текущего запроса

## Модели данных

Модели слоя Model изолированы, каждая отвечает строго за свою задачу.

### Класс Products

**Назначение:** управление каталогом товаров

**Конструктор:**
- `events: EventEmitter` - экземпляр EventEmitter для работы с событиями

**Поля:**
- `items: IProduct[]` — список всех товаров
- `selectedItem: IProduct | null` — товар, выбранный для предпросмотра

**Методы:**
- `setItems(items: IProduct[]): void` — сохранить массив товаров и уведомить об изменениях
- `getItems(): IProduct[]` — получить весь каталог
- `setItem(selectedItem: IProduct): void` — выбрать товар для предпросмотра и уведомить
- `getItem(): IProduct | null` — получить товар для предпросмотра
- `getItemById(id: string): IProduct | undefined` — получить товар по id

**События:**
- `catalog:changed` — обновился список товаров
- `catalog:preview` — выбран товар для предпросмотра

### Класс Basket

**Назначение:** управление корзиной покупок

**Конструктор:**
- `events: EventEmitter` - экземпляр EventEmitter для работы с событиями

**Поля:**
- `basketItems: IProduct[]` — содержимое корзины

**Методы:**
- `addItem(item: IProduct): void` — добавить товар в корзину
- `removeItem(item: IProduct): void` — удалить товар из корзины
- `emptyBasket(): void` — очистить корзину
- `getBasketItems(): IProduct[]` — получить позиции корзины
- `getTotalPrice(): number` — итоговая стоимость корзины
- `getItemsTotal(): number` — количество товаров в корзине
- `checkItemById(id: string): boolean` — проверка наличия товара в корзине

**События:**
- `cart:changed` — корзина изменилась

### Класс Buyer

**Назначение:** хранение данных покупателя и их валидация

**Конструктор:**
- `events: EventEmitter` - экземпляр EventEmitter для работы с событиями

**Поля:**
- `data: IBuyer` — объект с данными покупателя

**Методы:**
- `setData(data: Partial<IBuyer>): void` — сохранить данные покупателя и уведомить об изменениях
- `getData(): IBuyer` — получить все данные покупателя
- `clearData(): void` — очистить данные
- `validateData(): Partial<Record<keyof IBuyer, string>>` — валидация полей, возвращает объект с ошибками для невалидных полей
- `isValid(): boolean` — проверка, все ли данные заполнены корректно

**События:**
- `buyer:changed` — изменены данные покупателя

## Слой коммуникации

**Класс WebLarekApi (src/components/api/wed-api.ts) инкапсулирует работу с сервером.**

**Конструктор:**
- `api: IApi` — принимает любой объект по интерфейсу IApi

**Методы:**
- `getProducts(): Promise<IProductsResponse>` — GET запрос для получения товаров
- `createOrder(order: IOrderRequest): Promise<IOrderResponse>` — POST запрос для создания заказа

# Слой Представления (View)

Слой View отвечает за отображение данных и взаимодействие с пользователем. Все классы представления наследуются от базового класса `Component`.

## Базовые классы

### Класс Card

**Родительский класс для всех типов карточек**

```typescript
class Card<T extends Partial<IProduct>> extends Component<T>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент, в который рендерится карточка
Назначение: Базовый класс для карточек товаров, содержащий только общие для всех карточек элементы.

**Поля:**

`titleElement: HTMLElement` - элемент заголовка
`priceElement: HTMLElement` - элемент цены

**Методы:**

`set title(value: string)` - установка заголовка карточки
`set price(value: number | null)` - установка цены ("Бесценно" для null)

Примечание: Специфичные для отдельных типов карточек элементы определяются в соответствующих дочерних классах.

### Класс Form

Родительский класс для всех форм

```typescript
abstract class Form<T> extends Component<T>
```
**Конструктор:**

`form: HTMLFormElement` - DOM-элемент формы

Назначение: Базовая функциональность для форм с валидацией.

**Поля:**

`submitButton: HTMLButtonElement` - кнопка отправки формы
`errorsElement: HTMLElement` - элемент отображения ошибок

**Методы:**

`set valid(value: boolean)` - активация/блокировка кнопки отправки
`set errors(message: string)` - установка сообщения об ошибке

## Классы карточек

### CardCatalog

**Карточка товара в каталоге**

```typescript
class CardCatalog extends Card<IProduct>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент карточки
`actions?: ICardCatalogActions` - опциональный объект с обработчиками событий
`onClick?: () => void` - обработчик клика по карточке

**Назначение:** Отображение товара в основном каталоге магазина.

Дополнительные поля (помимо унаследованных):

`imageElement: HTMLImageElement` - элемент изображения
`categoryElement: HTMLElement` - элемент категории

**Дополнительные методы:**

`set image(value: string)` - установка изображения с CDN
`set category(value: string)` - установка категории

**События:**

click по карточке → вызывает actions.onClick()

### CardPreview

**Карточка предпросмотра товара**

```typescript
class CardPreview extends Card<IProduct>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент карточки
`actions?: ICardPreviewActions` - опциональный объект с обработчиками событий
`onClick?: () => void` - обработчик клика по кнопке

**Назначение:** Детальное отображение товара в модальном окне предпросмотра.

**Дополнительные поля (помимо унаследованных):**

`imageElement: HTMLImageElement` - элемент изображения
`categoryElement: HTMLElement` - элемент категории
`descriptionElement: HTMLElement` - элемент описания
`buttonElement: HTMLButtonElement` - элемент кнопки

**Дополнительные методы:**

`set image(value: string)` - установка изображения
`set category(value: string)` - установка категории
`set description(value: string)` - установка описания
`set buttonText(value: string)` - установка текста кнопки
`set buttonDisabled(value: boolean)` - блокировка кнопки

**События:**

click по кнопке → вызывает actions.onClick()

### CardBasket

**Карточка товара в корзине**

```typescript
class CardBasket extends Card<IProduct>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент карточки
`actions?: { onDelete?: () => void }` - опциональный объект с обработчиком удаления

**Назначение:** Отображение товара в списке корзины покупок.

**Дополнительные поля (помимо унаследованных):**

`indexElement: HTMLElement` - элемент порядкового номера
`deleteButton: HTMLButtonElement` - кнопка удаления

**Дополнительные методы:**

`set index(value: number)` - установка порядкового номера

**События:**

click по кнопке удаления → вызывает actions.onDelete()

## Классы форм

### Order

**Форма оформления заказа**

```typescript
class Order extends Form<IOrder>
```

**Конструктор:**

`container: HTMLFormElement` - DOM-элемент формы
`events: IEvents` - экземпляр EventEmitter для работы с событиями

**Назначение:** Форма выбора способа оплаты и ввода адреса доставки.

**Дополнительные поля (помимо унаследованных):**

`paymentButtons: NodeListOf<HTMLButtonElement>` - кнопки выбора способа оплаты
`addressInput: HTMLInputElement` - поле ввода адреса

**Дополнительные методы:**

`set payment(method: string)` - установка выбранного способа оплаты
`set address(value: string)` - установка адреса доставки

**События:**

`click` по кнопкам оплаты → order:payment
`input` в поле адреса → order:address
`submit` формы → order:submit

### Contacts

**Форма контактных данных**

```typescript
class Contacts extends Form<IContacts>
```

**Конструктор:**

`container: HTMLFormElement` - DOM-элемент формы
`events: IEvents` - экземпляр EventEmitter для работы с событиями

**Назначение:** Форма ввода email и телефона покупателя.

**Дополнительные поля (помимо унаследованных):**

`emailInput: HTMLInputElement` - поле ввода email
`phoneInput: HTMLInputElement` - поле ввода телефона

**Дополнительные методы:**

`set email(value: string)` - установка email
`set phone(value: string)` - установка телефона

**События:**

`input` в поле email → contacts:email
`input` в поле телефона → contacts:phone
`submit` формы → contacts:submit

## Компоненты интерфейса

### Basket (Basketform.ts)

**Компонент корзины покупок**

```typescript
class Basket extends Component<{ items: HTMLElement[]; total: number }>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент корзины
`events: IEvents` - экземпляр EventEmitter для работы с событиями
**Назначение:** Отображение списка товаров в корзине и общей суммы.

**Поля:**

`list: HTMLElement` - список товаров
`button: HTMLButtonElement` - кнопка оформления заказа
`totalEl: HTMLElement` - элемент общей суммы

**Методы:**

`set items(items: HTMLElement[])` - установка списка товаров
`set total(amount: number)` - установка общей суммы
`set empty(isEmpty: boolean)` - отображение состояния пустой корзины

**События:**

`click` по кнопке оформления → `cart:checkout`

### Success

**Компонент успешного заказа**

```typescript
class Success extends Component<ISuccess>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент компонента
`events: IEvents` - экземпляр EventEmitter для работы с событиями

**Назначение:** Отображение подтверждения успешного оформления заказа.

**Поля:**

`titleElement: HTMLElement` - элемент заголовка
`descriptionElement: HTMLElement` - элемент описания
`closeButton: HTMLButtonElement` - кнопка закрытия

**Методы:**

`set title(value: string)` - установка заголовка
`set description(value: string)` - установка описания

**События:**

`click` по кнопке закрытия → `success:close`

### Modal

**Модальное окно**

```typescript
class Modal extends Component<IModal>
```

**Конструктор:**

`events: IEvents` - экземпляр EventEmitter для работы с событиями
`container: HTMLElement` - DOM-элемент модального окна

**Назначение:** Универсальное модальное окно для отображения различного контента.

**Поля:**

`closeButton: HTMLButtonElement` - кнопка закрытия
`contentElement: HTMLElement` - контейнер для контента

**Методы:**

`open()` - открытие модального окна
`close()` - закрытие модального окна
`set content(value: HTMLElement)` - установка контента

**События:**

`click` по кнопке закрытия → modal:request-close
`click по overlay` → modal:request-close
`keydown (Escape)` → modal:request-close

### Header

**Шапка сайта**

```typescript
class Header extends Component<IHeader>
```

**Конструктор:**

`events: IEvents` - экземпляр EventEmitter для работы с событиями
`container: HTMLElement` - DOM-элемент шапки

**Назначение:** Отображение шапки сайта с счетчиком товаров в корзине.

**Поля:**

`basketButton: HTMLButtonElement` - кнопка корзины
`counterElement: HTMLElement` - счетчик товаров

**Методы:**

`set counter(value: number)` - установка значения счетчика

**События:**

`click` по кнопке корзины → basket:open

### Gallery

**Галерея товаров**

```typescript
class Gallery extends Component<HTMLElement>
```

**Конструктор:**

`container: HTMLElement` - DOM-элемент контейнера галереи

**Назначение:** Контейнер для отображения карточек товаров каталога.

**Методы:**

`set items(items: HTMLElement[])` - установка списка карточек товаров

События: Не генерирует события

## Принципы работы слоя View

- Инкапсуляция DOM: Каждый класс работает строго со своим блоком разметки
- Событийная модель: Все пользовательские действия генерируют события для обработки в Презентере
- Наследование: Карточки и формы используют общих родителей для переиспользования кода
- Минимализм базовых классов: Card содержит только title и price, Form содержит только valid и errors
- Изоляция: Каждый компонент независим и общается только через события
- Реактивность: Изменения данных автоматически отражаются в интерфейсе через сеттеры

## Принципы работы MVP в проекте

View генерирует события: Каждый обработчик в компонентах View генерирует событие через emit()
Model генерирует события: Методы Model, изменяющие данные, генерируют события
Presenter обрабатывает события: Все события обрабатываются в main.ts через on()
Нет прямых зависимостей: Компоненты не знают друг о друге, общаются только через события
Четкое разделение: Model управляет данными, View отображает, Presenter связывает