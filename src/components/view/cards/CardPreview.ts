import { Card } from './Card';
import { IProduct } from '../../../types';
import { CDN_URL, categoryMap } from '../../../utils/constants';

interface ICardPreviewActions {
    onClick?: () => void;
}

// Создаем тип только с нужными полями
export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'> & {
    buttonText: string;
    buttonDisabled: boolean;
};

export class CardPreview extends Card<TCardPreview> {
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
        // Добавляем класс для цвета фона
        this.updateCategoryStyle(value);
    }

    private updateCategoryStyle(category: string): void {
        // Сначала сбрасываем все классы
        this.categoryElement.className = 'card__category';
        
        // Добавляем модификатор если есть в categoryMap
        const categoryInfo = categoryMap[category];
        if (categoryInfo) {
            this.categoryElement.classList.add(`card__category_${categoryInfo.mod}`);
        }
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