import { PaymentStripePayloadEntity } from "../domain/PaymentPayloadEntity";
import PaymentRepository from "../infrastructure/PaymentRepository";

export class PaymentController {
    constructor() {
    }

    async makePayment(data: PaymentStripePayloadEntity){
        PaymentRepository.doPayment()
    }
}