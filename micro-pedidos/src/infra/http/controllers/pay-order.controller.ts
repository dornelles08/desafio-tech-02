// src/order-processor/order-processor.controller.ts
import { PayOrderUseCase } from "@/domain/application/use-cases/pay-order";
import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices"; // Importe os decoradores [3]

interface OrderMessagePayload {
  pattern: string;
  data: {
    value: number;
    customerEmail: string;
    customerName: string;
    status: string;
    id: string;
  };
}

@Controller()
export class PayOrderController {
  constructor(private readonly payOrderUseCase: PayOrderUseCase) {}

  @EventPattern("order.paied")
  async handleOrderCreated(
    @Payload() data: OrderMessagePayload["data"],
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    // if (originalMsg.fields.routingKey !== "create-order") {
    //   return;
    // }

    try {
      console.log(` Recebido evento 'order.paied' para o pedido ID: ${data.id}`);
      // console.log(` Detalhes do pedido: ${JSON.stringify(data)}`);

      console.log(` Pedido ${data.id} processado com sucesso.`);

      channel.ack(originalMsg);
    } catch (error) {
      console.error(` Erro ao processar pedido ${data.id}: ${error.message}`);

      channel.nack(originalMsg, false, false);
    }
  }
}
