// src/order-processor/order-processor.controller.ts
import { PayOrderUseCase } from "@/domain/application/use-cases/pay-order";
import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices"; // Importe os decoradores [3]

interface OrderMessagePayload {
  id: string;
  value: number;
  customerEmail: string;
  customerName: string;
  status: string;
  createdAt: string;
}

@Controller()
export class PayOrderController {
  constructor(private readonly payOrderUseCase: PayOrderUseCase) {}

  @EventPattern("order.paied")
  async handleOrderCreated(@Payload() data: OrderMessagePayload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      console.log(` Recebido evento 'order.paied' para o pedido ID: ${data.id}`);

      await this.payOrderUseCase.execute({
        orderId: data.id,
      });

      channel.ack(originalMsg);
    } catch (error) {
      console.error(` Erro ao processar pedido ${data.id}: ${error.message}`);

      channel.nack(originalMsg, false, false);
    }
  }
}
