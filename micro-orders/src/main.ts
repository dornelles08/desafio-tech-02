import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { EnvService } from "./infra/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get(EnvService);
  const port = envService.get("PORT");

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [envService.get("RABBITMQ_URL")],      
      queue: "order_queue",
      queueOptions: { durable: true },
      prefetchCount: 1,
      noAck: false,
      persistent: true,
      consumerTag: "micro-order",
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
