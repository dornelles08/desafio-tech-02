import { MessagingService } from "@/domain/application/messaging/messaging";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RabbitMqService implements MessagingService {
  constructor(
    @Inject("PAYMENT_CLIENT")
    private readonly payment_client: ClientProxy,

    @Inject("NOTIFICATION_CLIENT")
    private readonly notificaiton_client: ClientProxy
  ) {}

  async sendMessage(message: any, event: string): Promise<void> {
    if (event !== "order.deliveried") {
      await firstValueFrom(this.payment_client.emit(event, message));
    }
    await firstValueFrom(this.notificaiton_client.emit(event, message));
  }
}
