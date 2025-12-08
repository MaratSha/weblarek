import { Card } from './Card';
import { IProduct } from '../../../types';
import { CDN_URL } from '../../../utils/constants';

interface ICardPreviewActions {
    onClick?: () => void;
}

export class CardPreview extends Card<IProduct> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardPreviewActions) {
        super(container);
        this.imageElement = this.container.querySelector('.card__image')!;
        this.categoryElement = this.container.querySelector('.card__category')!;
        this.descriptionElement = this.container.querySelector('.card__text')!;
        this.buttonElement = this.container.querySelector('.card__button')!;
        
        this.buttonElement.addEventListener('click', () => {
            actions?.onClick?.();
        });
    }

    set image(value: string) {
        this.imageElement.src = `${CDN_URL}/${value}`;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
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