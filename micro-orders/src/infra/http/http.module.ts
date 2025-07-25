import { CreateOrderUseCase } from "@/domain/application/use-cases/create-order";
import { DeliveryOrderUseCase } from "@/domain/application/use-cases/delivery-order";
import { FetchOrdersUseCase } from "@/domain/application/use-cases/fetch-orders";
import { PayOrderUseCase } from "@/domain/application/use-cases/pay-order";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { MessagingModule } from "../messaging/messaging.module";
import { CreateOrderController } from "./controllers/create-order.controller";
import { DeliveryOrderController } from "./controllers/delivery-order.controller";
import { FetchOrdersController } from "./controllers/fetch-order.controller";
import { PayOrderController } from "./controllers/pay-order.controller";

@Module({
  imports: [DatabaseModule, MessagingModule],
  controllers: [
    CreateOrderController,
    DeliveryOrderController,
    PayOrderController,
    FetchOrdersController,
  ],
  providers: [CreateOrderUseCase, DeliveryOrderUseCase, PayOrderUseCase, FetchOrdersUseCase],
})
export class HttpModule {}
