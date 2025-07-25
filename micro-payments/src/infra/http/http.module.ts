import { Module } from "@nestjs/common";
import { OrderCreatedNotifyController } from "./controllers/order-created.controller";

@Module({
  imports: [],
  controllers: [OrderCreatedNotifyController],
  providers: [],
})
export class HttpModule {}
