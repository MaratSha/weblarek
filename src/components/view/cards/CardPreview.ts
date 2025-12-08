import { Card } from './Card';
import { ensureElement } from '../../../utils/utils';
import { IProduct } from '../../../types';

interface ICardPreviewActions {
  onClick?: () => void;
}

export class CardPreview extends Card<IProduct> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected actions: ICardPreviewActions = {}) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);
    
    this.buttonElement.addEventListener('click', () => {
      this.actions.onClick?.();
    });
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
    this.buttonElement.classList.toggle('button_disabled', value);
  }
}