import { Form } from './Form';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';

export interface IContacts {
  email: string;
  phone: string;
  error: string;
  valid: boolean;
}

export class Contacts extends Form<IContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', container);
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', container);
  }

  protected handleSubmit(): void {
    this.events.emit('contacts:submit');
  }

  protected handleInput(field: keyof IContacts, value: string): void {
    if (field === 'email') {
      this.events.emit('contacts:email', { email: value });
    } else if (field === 'phone') {
      this.events.emit('contacts:phone', { phone: value });
    }
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}