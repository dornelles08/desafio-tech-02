import { CreateOrderUseCase } from "@/domain/application/use-cases/create-order";
import { PayOrderUseCase } from "@/domain/application/use-cases/pay-order";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { MessagingModule } from "../messaging/messaging.module";
import { OrderCreatedNotifyController } from "./controllers/order-created.controller";
import { PayOrderController } from "./controllers/pay-order.controller";

@Module({
  imports: [DatabaseModule, MessagingModule],
  controllers: [OrderCreatedNotifyController, PayOrderController],
  providers: [CreateOrderUseCase, PayOrderUseCase],
})
export class HttpModule {}
