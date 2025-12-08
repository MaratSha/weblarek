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

  validate(): Partial<Record<keyof IBuyer, string>> {
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

  clear(): void {
    this.data = { payment: "", email: "", phone: "", address: "" };
  }
}