import { MessagingService } from "@/domain/application/messaging/messaging";
import { EnvService } from "@/infra/env/env.service";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RabbitMqService implements MessagingService {
  constructor(
    @Inject("ORDER_CLIENT")
    private readonly order_client: ClientProxy,

    @Inject("NOTIFICATION_CLIENT")
    private readonly notificaiton_client: ClientProxy,

    private readonly env: EnvService
  ) {}

  async sendMessage(message: any, event: string): Promise<void> {
    const env = this.env.get("ENV");
    if (env === "TEST") return;

    await firstValueFrom(this.order_client.emit(event, message));
    await firstValueFrom(this.notificaiton_client.emit(event, message));
  }
}
