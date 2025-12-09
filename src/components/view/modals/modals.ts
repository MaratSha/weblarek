import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container);
    
    this.closeButton = this.container.querySelector('.modal__close')!;
    this.contentElement = this.container.querySelector('.modal__content')!;
    
    this.closeButton.addEventListener('click', () => {
      events.emit('modal:request-close');
    });
    
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        events.emit('modal:request-close');
      }
    });
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        events.emit('modal:request-close');
      }
    });
  }

  set content(value: HTMLElement) {
    this.contentElement.innerHTML = '';
    this.contentElement.appendChild(value);
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }

  open(): void {
    this.container.classList.add('modal_active');
  }

  close(): void {
    this.container.classList.remove('modal_active');
  }
}