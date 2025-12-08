import { IProduct } from '../../../types';
import { Component } from '../../base/Component';
import { categoryMap, CDN_URL } from '../../../utils/constants';

/**
 * Базовый компонент карточки товара
 */
export class Card<T extends Partial<IProduct>> extends Component<T> {
    protected titleElement?: HTMLElement;
    protected priceElement?: HTMLElement;
    protected imageElement?: HTMLImageElement;
    protected categoryElement?: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.initElements();
    }

    // Инициализация DOM-элементов
    private initElements(): void {
        this.titleElement = this.getElement('.card__title');
        this.priceElement = this.getElement('.card__price');
        this.imageElement = this.getElement('.card__image');
        this.categoryElement = this.getElement('.card__category');
    }

    // Утилита для безопасного получения элемента
    private getElement<K extends HTMLElement>(selector: string): K | undefined {
        return this.container.querySelector<K>(selector) || undefined;
    }

    set title(value: string) {
        this.setText(this.titleElement, value);
    }

    set price(value: number | null) {
        this.setText(this.priceElement, this.formatPrice(value));
    }

    set image(value: string) {
        if (this.imageElement && value) {
            this.setImage(this.imageElement, `${CDN_URL}/${value}`, this.title as string);
        }
    }

    set category(value: string) {
        if (this.categoryElement) {
            this.categoryElement.textContent = value;
            this.updateCategoryClass(value);
        }
    }

    private setText(element: HTMLElement | undefined, text: string): void {
        if (element) element.textContent = text;
    }

    private formatPrice(price: number | null): string {
        return price === null ? 'Бесценно' : `${price} синапсов`;
    }

    private updateCategoryClass(category: string): void {
        if (!this.categoryElement) return;
        
        const categoryInfo = categoryMap[category];
        if (categoryInfo) {
            this.categoryElement.className = `card__category card__category_${categoryInfo.mod}`;
        }
    }

    /**
     * Проверяет, инициализированы ли все элементы карточки
     */
    isInitialized(): boolean {
        return !!(this.titleElement && this.priceElement && this.imageElement && this.categoryElement);
    }

    /**
     * Сбрасывает стили категории
     */
    resetCategory(): void {
        if (this.categoryElement) {
            this.categoryElement.className = 'card__category';
        }
    }
}