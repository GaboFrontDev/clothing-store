import { authMiddleware } from "@/decorators/authorized";
import OrderRepository from "../infrastructure/OrderRepository";
import { OrderEntity } from "../domain/OrderEntity";
import { randomUUID } from "crypto";

export class OrderController<Request> {
  @authMiddleware
  async getOrdersByUserId(
    req: Request,
    id: string
  ) {
    return OrderRepository.getOrdersByUserId(id);
  }

  @authMiddleware
  async createOrder(
    req: Request,
    payload: Omit<OrderEntity, "id">
  ) {
    OrderRepository.createNewOrder({
      ...payload,
      id: randomUUID(),
    });
  }
}
