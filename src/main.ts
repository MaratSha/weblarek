import "./scss/styles.scss";

// ИМПОРТ МОДУЛЕЙ И ДАННЫХ

import { apiProducts } from "./utils/data";
import { Buyer } from "./components/Models/Buyer";
import { Basket } from "./components/Models/Basket";
import { Products } from "./components/Models/Products";
import { IBuyer } from "./types";
import { Api, WebLarekApi } from "./components/base/Api";
import { API_URL } from "./utils/constants";

// РАБОТА МОДЕЛИ ТОВАРОВ (PRODUCTS)

console.log("🛍️  ДЕМОНСТРАЦИЯ РАБОТЫ С ТОВАРАМИ");
console.log("========================================");

const productsModel = new Products();
// Устанавливаем массив товаров и выбранный товар
productsModel.setItems(apiProducts.items);
productsModel.setItem(apiProducts.items[0]);

console.log("📋 Все товары из каталога:", productsModel.getItems());
console.log(
  "🔍 Выбранный товар для детального просмотра:",
  productsModel.getItem()
);
console.log(
  "🎯 Поиск товара по ID:",
  productsModel.getItemById(apiProducts.items[1].id)
);

console.log("\n");

// РАБОТА МОДЕЛИ ПОКУПАТЕЛЯ (BUYER)

console.log("👤 ДЕМОНСТРАЦИЯ РАБОТЫ С ДАННЫМИ ПОКУПАТЕЛЯ");
console.log("========================================");

// Тестовые данные покупателя
const buyer1: IBuyer = {
  payment: "card",
  email: "andruxa21_sminov52@gnail.com",
  phone: "+79036236167",
  address: "ул. Ленина дом 7 пр. 3",
};

const buyerModel = new Buyer();
// Заполняем данные покупателя
buyerModel.setData({
  email: buyer1.email,
  phone: buyer1.phone,
});

console.log("💾 Сохраненные данные покупателя:", buyerModel.getData());
console.log("✅ Проверка корректности данных:", buyerModel.validateData());

// Очищаем данные и показываем результат
buyerModel.clearData();
console.log("🗑️  Данные после очистки:", buyerModel.getData());
console.log("\n");

// РАБОТА КОРЗИНЫ (BASKET)

console.log("🛒 ДЕМОНСТРАЦИЯ РАБОТЫ КОРЗИНЫ");
console.log("========================================");

const basketModel = new Basket();

// Добавляем три товара в корзину
console.log("➕ Добавляем товары в корзину...");
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
basketModel.addItem(apiProducts.items[2]);

console.log("📦 Содержимое корзины:", basketModel.getBasketItems());
console.log("🔢 Количество товаров в корзине:", basketModel.getItemsTotal());
console.log("💰 Общая стоимость корзины:", basketModel.getTotalPrice());
console.log(
  "🔍 Проверка наличия товара в корзине:",
  basketModel.checkItemById(apiProducts.items[0].id)
);

// Удаляем один товар
console.log("➖ Удаляем товар из корзины...");
basketModel.removeItem(apiProducts.items[0]);
console.log("📦 Корзина после удаления:", basketModel.getBasketItems());

// Очищаем всю корзину
console.log("🗑️  Очищаем корзину полностью...");
basketModel.emptyBasket();
console.log("📦 Корзина после очистки:", basketModel.getBasketItems());

//  РАБОТА С API

const baseApi = new Api(API_URL);
const localApi = new WebLarekApi(baseApi);

async function getProducts() {
  try {
    const productsModelApi = new Products();
    console.log("⏳ Загружаем товары с сервера...");

    const products = await localApi.getData();
    productsModelApi.setItems(products);

    console.log("✅ Товары успешно загружены:", productsModelApi.getItems());
  } catch (error) {
    console.error("❌ Ошибка при загрузке товаров:", error);
  }
}

// Запускаем загрузку товаров через API
getProducts();
