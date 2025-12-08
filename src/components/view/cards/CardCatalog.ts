import { Card } from './Card';
import { IProduct } from '../../../types';

interface ICardCatalogActions {
  onClick?: () => void;
}

export class CardCatalog extends Card<IProduct> {
  constructor(container: HTMLElement, protected actions: ICardCatalogActions) {
    super(container);
    
    this.container.addEventListener('click', () => {
      this.actions.onClick?.();
    });
  }
}