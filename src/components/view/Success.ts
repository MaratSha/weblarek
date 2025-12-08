import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export interface ISuccess {
    title: string;
    description: string;
}

export class Success extends Component<ISuccess> {
    protected titleElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.titleElement = this.container.querySelector('.order-success__title')!;
        this.descriptionElement = this.container.querySelector('.order-success__description')!;
        this.closeButton = this.container.querySelector('.order-success__close')!;
        
        this.closeButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }
}