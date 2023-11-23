import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { OrderEntity } from "../domain/OrderEntity";


interface OrderRepository extends StrapiRepository<OrderEntity> {
  getUserOrders(id: number): Promise<OrderEntity | null>;
}

export default OrderRepository;
