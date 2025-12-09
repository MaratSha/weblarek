import { Form } from './Form';
import { IEvents } from '../../base/Events';

export interface IContacts {
    email: string;
    phone: string;
}

export class Contacts extends Form<IContacts> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.emailInput = container.querySelector('input[name="email"]')!;
        this.phoneInput = container.querySelector('input[name="phone"]')!;

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('contacts:submit');
        });

        this.emailInput.addEventListener('input', () => {
            this.events.emit('contacts:email', { 
                email: this.emailInput.value 
            });
        });

        this.phoneInput.addEventListener('input', () => {
            this.events.emit('contacts:phone', { 
                phone: this.phoneInput.value 
            });
        });
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}