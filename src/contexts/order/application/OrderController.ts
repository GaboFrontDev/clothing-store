import { authMiddleware } from "@/decorators/authorized";
import OrderRepository from "../infrastructure/OrderRepository";
import { OrderEntity } from "../domain/OrderEntity";

export class OrderController<Request> { 
    @authMiddleware
    getOrdersByUserId(req: Request, id: string): Promise<OrderEntity> {
        return OrderRepository.getOrdersByUserId(id);

    }

}
