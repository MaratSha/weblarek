import { IBuyer } from '../../types';
import { EventEmitter } from '../base/Events';

export class Buyer {
    private data: IBuyer = {
        payment: "",
        email: "",
        phone: "",
        address: ""
    };
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setData(data: Partial<IBuyer>): void {
        this.data = { ...this.data, ...data };
        this.events.emit('buyer:changed', this.data);
    }

    getData(): IBuyer {
        return { ...this.data };
    }

    validateData(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (!this.data.payment) {
            errors.payment = 'Не указан способ оплаты';
        }
        
        if (!this.data.email?.trim()) {
            errors.email = 'Укажите электронную почту';
        }
        
        if (!this.data.phone?.trim()) {
            errors.phone = 'Введите номер телефона';
        }
        
        if (!this.data.address?.trim()) {
            errors.address = 'Необходим адрес доставки';
        }

        return errors;
    }

    isValid(): boolean {
        const errors = this.validateData();
        return Object.keys(errors).length === 0;
    }

    clearData(): void {
        this.data = { payment: "", email: "", phone: "", address: "" };
        this.events.emit('buyer:changed', this.data);
    }
}