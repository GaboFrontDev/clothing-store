import { authMiddleware } from "@/decorators/authorized";
import OrderRepository from "../infrastructure/OrderRepository";
import { OrderEntity } from "../domain/OrderEntity";
import { randomUUID } from "crypto";
import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { CartEntity } from "../domain/CartEntity";
import { checkProductAvailableOrFail, updateProductAvailable } from "./helpers/productsInventoryQueries";

export class OrderController<Request> {
  @authMiddleware
  async getOrdersByUserId(req: Request, id: string) {
    return OrderRepository.getOrdersByUserId(id);
  }

  async addToCart(cart: CartEntity, newProduct: ProductEntity, amount = 1) {
    checkProductAvailableOrFail(newProduct, amount);
    const index = cart.products.map(product => product.id).indexOf(newProduct.id);
    if (index >= 0) {
      cart.products[index].amount += amount;
    } else {
      cart.products.push(newProduct);
    }
    cart.amount += newProduct.price;
    updateProductAvailable(newProduct, amount);
    return cart;
  }

  async removeFromCart(cart: CartEntity, product: ProductEntity, deleteAll = false) {
    const index = cart.products.map(product => product.id).indexOf(product.id);
    if (index < 0) {
      throw Error('Product not in cart');
    }
    if (deleteAll) {
      cart.products.splice(index, 1);
      updateProductAvailable(product, -cart.products.length);
      return 0;
    }
    cart.products[index].amount -= 1;
    updateProductAvailable(product, -1);
    return cart;
  }

  @authMiddleware
  async createOrder(req: Request, payload: Omit<OrderEntity, "id">) {
    OrderRepository.createNewOrder({
      ...payload,
      id: randomUUID(),
    });
  }
}
