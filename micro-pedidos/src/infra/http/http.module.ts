import { CreateOrderUseCase } from "@/domain/application/use-cases/create-order";
import { DeliveryOrderUseCase } from "@/domain/application/use-cases/delivery-order";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { MessagingModule } from "../messaging/messaging.module";
import { CreateOrderController } from "./controllers/create-order.controller";
import { DeliveryOrderController } from "./controllers/delivery-order.controller";

@Module({
  imports: [DatabaseModule, MessagingModule],
  controllers: [CreateOrderController, DeliveryOrderController],
  providers: [CreateOrderUseCase, DeliveryOrderUseCase],
})
export class HttpModule {}
