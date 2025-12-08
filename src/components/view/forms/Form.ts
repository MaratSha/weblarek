import { Component } from '../../base/Component';

export abstract class Form<T> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(form: HTMLFormElement) {
        super(form);
        this.submitButton = this.container.querySelector('button[type="submit"]')!;
        this.errorsElement = this.container.querySelector('.form__errors')!;
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
        this.submitButton.classList.toggle('button_disabled', !value);
    }

    set errors(message: string) {
        this.errorsElement.textContent = message;
    }
}