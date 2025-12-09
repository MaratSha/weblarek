import { Card } from './Card';
import { IProduct } from '../../../types';

// Создаем тип только с нужными полями
export type TCardBasket = Pick<IProduct, 'title' | 'price'> & {
    index: number;
};

export class CardBasket extends Card<TCardBasket> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: { onDelete?: () => void }) {
        super(container);
        this.indexElement = this.container.querySelector('.basket__item-index')!;
        this.deleteButton = this.container.querySelector('.basket__item-delete')!;

        if (actions?.onDelete) {
            this.deleteButton.addEventListener('click', actions.onDelete);
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}