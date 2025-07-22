import { OrderRepository } from "@/domain/application/repositories/order.repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaOrderRepository } from "./prisma/repositories/prisma-order.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [PrismaService, OrderRepository],
})
export class DatabaseModule {}
