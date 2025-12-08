import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Basket {
    private basketItems: IProduct[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    getBasketItems(): IProduct[] {
        return [...this.basketItems];
    }

    addItem(item: IProduct): void {
        this.basketItems.push(item);
        this.events.emit('cart:changed');
    }

    removeItem(item: IProduct): void {
        this.basketItems = this.basketItems.filter(basketItem => basketItem.id !== item.id);
        this.events.emit('cart:changed');
    }

    emptyBasket(): void {
        this.basketItems = [];
        this.events.emit('cart:changed');
    }

    getTotalPrice(): number {
        return this.basketItems.reduce((total, item) => total + (item.price ?? 0), 0);
    }

    getItemsTotal(): number {
        return this.basketItems.length;
    }

    checkItemById(id: string): boolean {
        return this.basketItems.some(item => item.id === id);
    }
}