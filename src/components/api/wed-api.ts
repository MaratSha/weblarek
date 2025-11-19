import { IApi, IProductsResponse, IOrderRequest, IOrderResponse, IErrorResponse } from '../../types';

export class WebLarekApi {  
    private localApi: IApi;

    constructor (localApi: IApi) {
        this.localApi = localApi;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.localApi.get('/product/');
    }

    postOrder(order: IOrderRequest): Promise<IOrderResponse | IErrorResponse> {
        return this.localApi.post('/order/', order);
    }
}