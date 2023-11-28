import { authMiddleware } from "@/decorators/authorized";
import OrderRepository from "../infrastructure/OrderRepository";
import { OrderEntity } from "../domain/OrderEntity";
import { randomUUID } from "crypto";
import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export class OrderController<Request> {
  @authMiddleware
  async getOrdersByUserId(req: Request, id: string): Promise<OrderEntity> {
    return OrderRepository.getOrdersByUserId(id);
  }

  async addToCart(cart: OrderEntity, newProduct: ProductEntity, amount = 1) {
    const index = cart.products.map(product => product.id).indexOf(newProduct.id);
    if(index >= 0) {
      cart.products[index].amount += amount;
    } else {
      cart.products.push(newProduct);
    }
    cart.amount += newProduct.price;

  }

  async removeFromCart(cart: OrderEntity, productId: string, deleteAll = false) {
    const index = cart.products.map(product => product.id).indexOf(productId);
    if(index < 0){
      throw Error('Product not in cart');
    }
    if(deleteAll) {
      cart.products.splice(index, 1);
      return 0;
    }
    cart.products[index].amount -= 1;
  }

  @authMiddleware
  async createOrder(req: Request, payload: Omit<OrderEntity, "id">) {
    OrderRepository.createNewOrder({
      ...payload,
      id: randomUUID(),
    });
  }
}
