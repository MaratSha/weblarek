import { Form } from './Form';
import { IEvents } from '../../base/Events';

export interface IOrder {
    payment: string;
    address: string;
}

export class Order extends Form<IOrder> {
    protected paymentButtons: NodeListOf<HTMLButtonElement>;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.paymentButtons = container.querySelectorAll('.button_alt');
        this.addressInput = container.querySelector('input[name="address"]')!;

        this.setupPaymentButtons();
        
        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('order:submit');
        });

        this.addressInput.addEventListener('input', () => {
            this.events.emit('order:address', {  
                field: 'address',  
                value: this.addressInput.value  
            });
        });
    }

    private setupPaymentButtons(): void {
        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit('order:payment', {
                    field: 'payment',
                    value: button.name
                });
            });
        });
    }

    set payment(method: string) {
        this.paymentButtons.forEach(button => {
            button.classList.toggle('button_alt-active', button.name === method);
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}