import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Products {
    private items: IProduct[] = [];
    private selectedItem: IProduct | null = null;
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setItems(items: IProduct[]): void {
        this.items = [...items];
        this.events.emit('catalog:changed');
    }

    getItems(): IProduct[] {
        return [...this.items];
    }

    setItem(selectedItem: IProduct): void {
        this.selectedItem = selectedItem;
        this.events.emit('catalog:preview', { selectedItem });
    }

    getItem(): IProduct | null {
        return this.selectedItem;
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }
}