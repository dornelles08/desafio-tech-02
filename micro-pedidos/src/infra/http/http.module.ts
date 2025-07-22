import { CreateOrderUseCase } from "@/domain/application/use-cases/create-order";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateOrderController } from "./controllers/create-order.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateOrderController],
  providers: [CreateOrderUseCase],
})
export class HttpModule {}
