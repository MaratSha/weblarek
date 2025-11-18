import { IProduct } from "../../types/index";

export class Basket {
  private basketItems: IProduct[] = [];
  
  constructor() {}

  // Основные геттеры
  getBasketItems(): IProduct[] {
    return this.basketItems;
  }

  getItemsTotal(): number {
    return this.basketItems.length;
  }

  getTotalPrice(): number {
    return this.basketItems.reduce((total, item) => total + (item.price ?? 0), 0);
  }

  // Основные операции
  addItem(item: IProduct): void {
    this.basketItems.push(item);
  }

  removeItem(item: IProduct): void {  
    this.basketItems = this.basketItems.filter(el => el.id !== item.id);   
  }

  // Вспомогательные методы
  emptyBasket(): void {
    this.basketItems.length = 0;
  }

  checkItemById(id: string): boolean {
    return this.basketItems.some(el => el.id === id);
  }
}