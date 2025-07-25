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
export class OrderPaiedNotifyController {
  constructor(private readonly orderNotify: OrderNotify) {}

  @EventPattern("order.paied")
  async handleOrderPaied(@Payload() data: OrderMessagePayload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      console.log(`Recebido evento 'order.paied' para o pedido ID: ${data.id}`);
      await this.orderNotify.execute({
        order: {
          id: data.id,
          status: data.status,
          value: data.value,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          createdAt: data.createdAt,
        },
        eventType: "paied",
      });

      channel.ack(originalMsg);
    } catch (error) {
      console.error(` Erro ao processar pedido ${data.id}: ${error.message}`);

      channel.nack(originalMsg, false, false);
    }
  }
}
