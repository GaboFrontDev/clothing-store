import { authMiddleware } from "@/decorators/authorized";
import OrderRepository from "../infrastructure/OrderRepository";
import { OrderEntity } from "../domain/OrderEntity";
import { randomUUID } from "crypto";
import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { CartEntity } from "../domain/CartEntity";

export class OrderController<Request> {
  @authMiddleware
  async getOrdersByUserId(req: Request, id: string): Promise<OrderEntity> {
    return OrderRepository.getOrdersByUserId(id);
  }

  async addToCart(cart: CartEntity, newProduct: ProductEntity, amount = 1) {
    const index = cart.products.map(product => product.id).indexOf(newProduct.id);
    if(index >= 0) {
      cart.products[index].amount += amount;
    } else {
      cart.products.push(newProduct);
    }
    cart.amount += newProduct.price;
    return cart;
  }

  async removeFromCart(cart: CartEntity, productId: string, deleteAll = false) {
    const index = cart.products.map(product => product.id).indexOf(productId);
    if(index < 0){
      throw Error('Product not in cart');
    }
    if(deleteAll) {
      cart.products.splice(index, 1);
      return 0;
    }
    cart.products[index].amount -= 1;
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
