import { IBuyer } from '../../types/index';

type TPayment = "card" | "cash" | "";

export class Buyer {
  private payment: TPayment = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  setPayment(value: TPayment): void {
    this.payment = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  setPhone(value: string): void {
    this.phone = value;
  }

  setAddress(value: string): void {
    this.address = value;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    };
  }

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;
  }

  clearData(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validateData(): { isValid: boolean; errors: Partial<Record<keyof IBuyer, string>> } {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) {
      errors.payment = 'Не указан способ оплаты';
    }
         
    if (!this.email?.trim()) {
      errors.email = 'Укажите электронную почту';
    }
         
    if (!this.phone?.trim()) {
      errors.phone = 'Введите номер телефона';
    }
         
    if (!this.address?.trim()) {
      errors.address = 'Необходим адрес доставки';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  isValid(): boolean {
    return this.validateData().isValid;
  }
}
