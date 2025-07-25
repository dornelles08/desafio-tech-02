import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const { RABBITMQ_URL } = process.env;

  if (!RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL environment variable is not defined");
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: "notification_queue",
      queueOptions: { durable: true },
      prefetchCount: 1,
      noAck: false,
      persistent: true,
      consumerTag: "micro-notifications",
    },
  });

  await app.listen();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
