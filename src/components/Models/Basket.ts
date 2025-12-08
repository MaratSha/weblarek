import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

/**
 * Класс корзины для управления товарами
 */
export class Basket {
    private items: IProduct[] = [];
    private events: EventEmitter;

    /**
     * Создает экземпляр корзины
     * @param events - шина событий для уведомлений об изменениях
     */
    constructor(events: EventEmitter) {
        this.events = events;
    }

    // ============ ОСНОВНЫЕ ОПЕРАЦИИ ============

    /**
     * Добавляет товар в корзину
     * @param item - товар для добавления
     */
    add(item: IProduct): void {
        this.items.push(item);
        this.notifyChange();
    }

    /**
     * Удаляет товар из корзины по ID
     * @param id - идентификатор товара для удаления
     */
    remove(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.notifyChange();
    }

    /**
     * Очищает корзину
     */
    clear(): void {
        this.items = [];
        this.notifyChange();
    }

    // ============ ГЕТТЕРЫ ============

    /**
     * Возвращает список товаров в корзине
     */
    getItems(): IProduct[] {
        return [...this.items]; // Возвращаем копию для иммутабельности
    }

    /**
     * Возвращает количество товаров в корзине
     */
    getCount(): number {
        return this.items.length;
    }

    /**
     * Возвращает общую стоимость товаров в корзине
     */
    getTotal(): number {
        return this.items.reduce((total, item) => {
            return total + (item.price ?? 0);
        }, 0);
    }

    // ============ ПРОВЕРКИ ============

    /**
     * Проверяет, содержит ли корзина товар с указанным ID
     * @param id - идентификатор товара для проверки
     */
    contains(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    /**
     * Проверяет, пуста ли корзина
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // ============ СЛУЖЕБНЫЕ МЕТОДЫ ============

    /**
     * Уведомляет о изменении состояния корзины
     */
    private notifyChange(): void {
        this.events.emit('cart:changed');
    }

    /**
     * Возвращает товар по ID
     * @param id - идентификатор товара
     */
    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    /**
     * Возвращает статистику корзины
     */
    getStats() {
        return {
            count: this.getCount(),
            total: this.getTotal(),
            items: this.getItems()
        };
    }
}