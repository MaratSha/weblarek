import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';

export interface ISuccess {
  title: string;
  description: string;
}

export class Success extends Component<ISuccess> {
  protected titleElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>('.order-success__title', container);
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
    
    this.closeButton.addEventListener('click', () => {
      this.events.emit('success:close');
    });
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}