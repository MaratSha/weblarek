import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';

export class BasketForm extends Component<{ items: HTMLElement[]; total: number }> {
    protected list = ensureElement('.basket__list', this.container);
    protected button = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    protected totalEl = ensureElement('.basket__price', this.container);

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.button.addEventListener('click', () => events.emit('cart:checkout'));
    }

    // Основные методы
    set items(items: HTMLElement[]) {
        this.list.replaceChildren(...items);
        this.updateButton(items.length > 0);
    }

    set total(amount: number) {
        this.totalEl.textContent = `${amount} синапсов`;
    }

    set empty(isEmpty: boolean) {
        if (isEmpty) this.list.innerHTML = '<p>Корзина пустая</p>';
        this.updateButton(!isEmpty);
    }

    // Вспомогательный метод
    private updateButton(enabled: boolean): void {
        this.button.disabled = !enabled;
        this.button.classList.toggle('button_disabled', !enabled);
    }
}