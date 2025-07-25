import { CreateOrderUseCase } from "@/domain/application/use-cases/create-order";
import { Status } from "@/domain/enterprise/entities/Status";
import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

interface OrderMessagePayload {
  id: string;
  value: number;
  customerEmail: string;
  customerName: string;
  status: Status;
  createdAt: string;
}

@Controller()
export class OrderCreatedNotifyController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @EventPattern("order.created")
  async handleOrderCreated(@Payload() data: OrderMessagePayload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      console.log(` Recebido evento 'order.created' para o pedido ID: ${data.id}`);
      await this.createOrderUseCase.execute({
        id: data.id,
        value: data.value,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        status: data.status,
        createdAt: data.createdAt,
      });

      console.log(` Pedido ${data.id} processado com sucesso.`);

      channel.ack(originalMsg);
    } catch (error) {
      console.error(` Erro ao processar pedido ${data.id}: ${error.message}`);

      channel.nack(originalMsg, false, false);
    }
  }
}
