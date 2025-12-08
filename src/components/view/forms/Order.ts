import { Form } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export interface IOrder {
  payment: string;
  address: string;
  error: string;
  valid: boolean;
}

export class Order extends Form<IOrder> {
  protected paymentButtons: NodeListOf<HTMLButtonElement>;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.paymentButtons = container.querySelectorAll(".button_alt");
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      container
    );

    this.setupPaymentButtons();
  }

  /**
   * Настраивает обработчики для кнопок выбора способа оплаты
   */
  private setupPaymentButtons(): void {
    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handlePaymentButtonClick(button);
      });
    });
  }

  /**
   * Обрабатывает клик по кнопке выбора способа оплаты
   */
  private handlePaymentButtonClick(button: HTMLButtonElement): void {
    this.events.emit("order:payment", {
      field: "payment",
      value: button.name,
    });
  }

  protected handleInput(field: keyof IOrder, value: string): void {
    if (field === "address") {
      this.events.emit("order:address", { field, value });
    }
  }

  protected handleSubmit(): void {
    this.events.emit("order:submit");
  }

  set payment(method: string) {
    this.updatePaymentButtons(method);
  }

  set address(value: string) {
    this.addressInput.value = value;
  }

  set error(value: string) {
    super.error = value;
  }

  set valid(value: boolean) {
    super.valid = value;
  }

  /**
   * Обновляет состояние кнопок способов оплаты
   */
  private updatePaymentButtons(selectedMethod: string): void {
    this.paymentButtons.forEach((button) => {
      const isSelected = button.name === selectedMethod;
      button.classList.toggle("button_alt-active", isSelected);
    });
  }

  /**
   * Возвращает текущий выбранный способ оплаты
   */
  getSelectedPayment(): string {
    const selectedButton = Array.from(this.paymentButtons).find((button) =>
      button.classList.contains("button_alt-active")
    );
    return selectedButton?.name || "";
  }

  /**
   * Проверяет, выбран ли способ оплаты
   */
  isPaymentSelected(): boolean {
    return this.getSelectedPayment() !== "";
  }

  /**
   * Проверяет, заполнен ли адрес
   */
  isAddressFilled(): boolean {
    return this.addressInput.value.trim() !== "";
  }

  /**
   * Возвращает данные формы заказа
   */
  getOrderData(): { payment: string; address: string } {
    return {
      payment: this.getSelectedPayment(),
      address: this.addressInput.value,
    };
  }
}
