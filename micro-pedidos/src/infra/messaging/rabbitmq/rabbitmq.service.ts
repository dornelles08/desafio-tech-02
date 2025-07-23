import { MessagingService } from "@/domain/application/messaging/messaging";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RabbitMqService implements MessagingService {
  constructor(
    @Inject("RABBIT_SERVICE")
    private readonly client: ClientProxy
  ) {}

  async sendMessage(message: any): Promise<void> {
    console.log("Enviando mensagem para RabbitMQ:", message);
    await firstValueFrom(this.client.emit("orders_queue_event", message));
  }
}
