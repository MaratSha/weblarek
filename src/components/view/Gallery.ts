import { Component } from '../base/Component';

// Создаем интерфейс для Gallery
interface IGallery {
    items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    constructor(protected container: HTMLElement) {
        super(container);
    }

    set items(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}