import { Component } from '../../base/Component';

// Создаем интерфейс для базовых свойств Card
export interface ICard {
    title: string;
    price: number | null;
}

// Делаем класс абстрактным и используем пересечение типов
export abstract class Card<T> extends Component<ICard & T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = this.container.querySelector('.card__title')!;
        this.priceElement = this.container.querySelector('.card__price')!;
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
    }
}