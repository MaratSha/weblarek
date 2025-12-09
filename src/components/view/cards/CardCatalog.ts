import { Card } from './Card';
import { IProduct } from '../../../types';
import { CDN_URL, categoryMap } from '../../../utils/constants';

interface ICardCatalogActions {
    onClick?: () => void;
}

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;

export class CardCatalog extends Card<TCardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    private actions?: ICardCatalogActions; 

    constructor(container: HTMLElement, actions?: ICardCatalogActions) {
        super(container);
        this.actions = actions;
    
        
        this.imageElement = this.container.querySelector('.card__image')!;
        this.categoryElement = this.container.querySelector('.card__category')!;
        
        // Регистрируем обработчик
        this.container.addEventListener('click', () => {
            this.actions?.onClick?.();
        });
    }

    set image(value: string) {
        this.imageElement.src = `${CDN_URL}/${value}`;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.updateCategoryStyle(value);
    }

    private updateCategoryStyle(category: string): void {
        this.categoryElement.className = 'card__category';
        const categoryInfo = categoryMap[category];
        if (categoryInfo) {
            this.categoryElement.classList.add(`card__category_${categoryInfo.mod}`);
        }
    }
}