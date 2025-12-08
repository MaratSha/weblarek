import { Card } from './Card';
import { IProduct } from '../../../types';
import { CDN_URL } from '../../../utils/constants';

interface ICardCatalogActions {
    onClick?: () => void;
}

export class CardCatalog extends Card<IProduct> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardCatalogActions) {
        super(container);
        this.imageElement = this.container.querySelector('.card__image')!;
        this.categoryElement = this.container.querySelector('.card__category')!;
        
        this.container.addEventListener('click', () => {
            actions?.onClick?.();
        });
    }

    set image(value: string) {
        this.imageElement.src = `${CDN_URL}/${value}`;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
    }
}