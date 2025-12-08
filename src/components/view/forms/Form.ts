import { Component } from '../../base/Component';

export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorElement: HTMLElement;

  constructor(protected readonly form: HTMLFormElement) {
    super(form);

    this.submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.errorElement = this.form.querySelector('.form__errors') as HTMLElement;
    
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    this.form.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      if (!target.name) return;

      const field = target.name as keyof T;
      const value = target.value;

      this.handleInput(field, value);
    });
  }

  protected abstract handleSubmit(): void;
  protected abstract handleInput(field: keyof T, value: string): void;

  set error(message: string) {
    this.errorElement.textContent = message;
  }

  set valid(isValid: boolean) {
    this.submitButton.disabled = !isValid;
    this.submitButton.classList.toggle('button_disabled', !isValid);
  }

  render(data?: Partial<T>): HTMLElement {
    super.render(data);
    return this.form;
  }
}