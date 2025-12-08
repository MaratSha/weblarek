import { IProduct } from '../../../types';
import { Component } from '../../base/Component';

export class Card<T extends Partial<IProduct>> extends Component<T> {
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