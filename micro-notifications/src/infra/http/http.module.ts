import { OrderNotify } from "@/domain/application/use-cases/order-notify";
import { Module } from "@nestjs/common";
import { EmailModule } from "../email/email.module";
import { OrderCreatedNotifyController } from "./controllers/order-created-notify.controller";
import { OrderDeliveriedNotifyController } from "./controllers/order-deliveried-notify.controller";
import { OrderPaiedNotifyController } from "./controllers/order-paied-notify.controller";

@Module({
  imports: [EmailModule],
  controllers: [
    OrderCreatedNotifyController,
    OrderDeliveriedNotifyController,
    OrderPaiedNotifyController,
  ],
  providers: [OrderNotify],
})
export class HttpModule {}
