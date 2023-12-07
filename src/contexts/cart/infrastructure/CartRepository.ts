import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { OrderEntity } from "../domain/OrderEntity";


class OrderRepositoryClass extends StrapiRepository<OrderEntity> {
  constructor() {
    super("order");
  }

  getOrdersByUserId(userId: string) {
    return this.getByQuery(`?populate=*&filters[user][id][$eq]=${userId}`);
  }

  createNewCart(data: OrderEntity) {
    try {
      const orderData = {
        ...data,
        products: [
          ...data.products.map(product => product.id)
        ]
      }
      this.create(JSON.stringify(orderData));
    } catch (error) {

    }
  }
}

const OrderRepository = new OrderRepositoryClass();
export default OrderRepository;
