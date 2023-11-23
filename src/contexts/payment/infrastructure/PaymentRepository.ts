import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { PaymentEntity } from "../domain/PaymentEntity";

class PaymentRepositoryClass extends StrapiRepository<PaymentEntity> {
    constructor(){
        super("payments");
    }
}

const PaymentRepository = new PaymentRepositoryClass();
export default PaymentRepository;
