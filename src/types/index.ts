export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  id: string; // уникальный идентификатор товара
  title: string; // название товара
  description: string; // описание товара
  image: string; // ссылка на изображение товара
  category: string; // категория, к которой относится товар
  price: number | null; // цена товара (null, если цена не указана)
}

export interface IBuyer {
  payment: "card" | "cash" | "";
  email: string; // email Покупателя
  phone: string; // телефон Покупателя
  address: string; // адрес доставки
}

export interface IOrderRequest extends IBuyer {
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IErrorResponse {
  error: string;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export function isOrderResponse(response: IOrderResponse | IErrorResponse): response is IOrderResponse {
  return 'id' in response && 'total' in response;
}