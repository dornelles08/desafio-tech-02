import { OrderNotify } from "@/domain/application/use-cases/order-notify";
import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

interface OrderMessagePayload {
  id: string;
  value: number;
  customerEmail: string;
  customerName: string;
  status: string;
  createdAt: string;
}

@Controller()
export class OrderDeliveriedNotifyController {
  constructor(private readonly orderNotify: OrderNotify) {}

  @EventPattern("order.deliveried")
  async handleOrderDeliveried(@Payload() data: OrderMessagePayload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      console.log(` Recebido evento 'order.deliveried' para o pedido ID: ${data.id}`);
      await this.orderNotify.execute({
        order: {
          id: data.id,
          status: data.status,
          value: data.value,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          createdAt: data.createdAt,
        },
        eventType: "deliveried",
      });

      channel.ack(originalMsg);
    } catch (error) {
      console.error(` Erro ao processar pedido ${data.id}: ${error.message}`);

      channel.nack(originalMsg, false, false);
    }
  }
}
