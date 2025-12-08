import { IApi, IProductsResponse, IOrderRequest, IOrderResponse, IErrorResponse, isOrderResponse } from '../../types';

export class WebLarekApi {  
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get('/product/');
    }

    async createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        // Отправляем запрос и получаем ответ
        const response = await this.api.post<IOrderResponse | IErrorResponse>('/order/', order);
        
        // Проверяем, является ли ответ успешным заказом
        if (isOrderResponse(response)) {
            return response;
        } else {
            // Если это ошибка, выбрасываем исключение
            throw new Error(response.error);
        }
    }
}