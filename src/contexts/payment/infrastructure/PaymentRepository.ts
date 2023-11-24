import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { PaymentEntity } from "../domain/PaymentEntity";

class PaymentRepositoryClass extends StrapiRepository<PaymentEntity> {
  constructor() {
    super("payments");
  }

  doPayment() {}

  storePayment(body: Omit<PaymentEntity, "id">) {
    this.create(JSON.stringify(body));
  }
}

const PaymentRepository = new PaymentRepositoryClass();
export default PaymentRepository;
