import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Basket extends Component<{ items: HTMLElement[]; total: number }> {
    protected list: HTMLElement;
    protected button: HTMLButtonElement;
    protected totalEl: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.list = this.container.querySelector('.basket__list')!;
        this.button = this.container.querySelector('.basket__button')!;
        this.totalEl = this.container.querySelector('.basket__price')!;

        this.button.addEventListener('click', () => {
            events.emit('cart:checkout');
        });
    }

    set items(items: HTMLElement[]) {
        this.list.replaceChildren(...items);
        this.updateButton(items.length > 0);
    }

    set total(amount: number) {
        this.totalEl.textContent = `${amount} синапсов`;
    }

    set empty(isEmpty: boolean) {
        if (isEmpty) {
            this.list.innerHTML = '<p>Корзина пустая</p>';
        }
        this.updateButton(!isEmpty);
    }

    private updateButton(enabled: boolean): void {
        this.button.disabled = !enabled;
        this.button.classList.toggle('button_disabled', !enabled);
    }
}   