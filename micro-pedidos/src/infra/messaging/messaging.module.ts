import { MessagingService } from "@/domain/application/messaging/messaging";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { RabbitMqService } from "./rabbitmq/rabbitmq.service";

@Module({
  imports: [
    EnvModule,
    ClientsModule.registerAsync([
      {
        name: "RABBIT_SERVICE",
        imports: [EnvModule],
        inject: [EnvService],
        useFactory: (envService: EnvService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [envService.get("RABBITMQ_URL")],
            queue: "orders_queue",
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [
    EnvService,
    {
      provide: MessagingService,
      useClass: RabbitMqService,
    },
  ],
  exports: [MessagingService, ClientsModule],
})
export class MessagingModule {}
