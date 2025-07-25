import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

interface OrderMessagePayload {
  value: number;
  customerEmail: string;
  customerName: string;
  status: string;
  id: string;
}

@Controller()
export class OrderCreatedNotifyController {
  constructor() {}

  @EventPattern("order.created")
  async handleOrderCreated(@Payload() data: OrderMessagePayload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      console.log(` Recebido evento 'order.created' para o pedido ID: ${data.id}`);
      // console.log(` Detalhes do pedido: ${JSON.stringify(data)}`);

      console.log(` Pedido ${data.id} processado com sucesso.`);

      channel.ack(originalMsg);
    } catch (error) {
      console.error(` Erro ao processar pedido ${data.id}: ${error.message}`);

      channel.nack(originalMsg, false, false);
    }
  }
}
