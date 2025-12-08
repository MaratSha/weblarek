import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

/**
 * Управление каталогом товаров
 */
export class Products {
    private items: IProduct[] = [];
    private previewId: string | null = null;
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    // ============ ОСНОВНЫЕ МЕТОДЫ ============

    setProducts(items: IProduct[]): void {
        this.items = [...items];
        this.emitCatalogChanged();
    }

    setPreview(id: string): void {
        this.previewId = id;
        this.events.emit('catalog:preview');
    }

    getPreview(): IProduct | null {
        if (!this.previewId) return null;
        return this.items.find(item => item.id === this.previewId) || null;
    }

    getById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    getAll(): IProduct[] {
        return [...this.items];
    }

    // ============ УТИЛИТЫ ============

    getCount(): number {
        return this.items.length;
    }

    exists(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // ============ СЛУЖЕБНЫЕ МЕТОДЫ ============

    private emitCatalogChanged(): void {
        this.events.emit('catalog:changed', { items: this.getAll() });
    }
}