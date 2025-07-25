import { Order, OrderProps } from "@/domain/enterprise/entities/Order";
import { PrismaOrderMapper } from "@/infra/database/prisma/mappers/prisma-order.mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export function makeOrder(override: Partial<OrderProps> = {}, id?: string) {
  const order = new Order(
    {
      value: faker.number.int({ min: 100, max: 100000 }),
      status: "criado",
      customerEmail: faker.internet.email(),
      customerName: faker.person.fullName(),
      ...override,
    },
    id
  );

  return order;
}

@Injectable()
export class OrderFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaOrder(data: Partial<OrderProps> = {}): Promise<Order> {
    const Order = makeOrder(data);

    await this.prisma.order.create({
      data: PrismaOrderMapper.toPrisma(Order),
    });

    return Order;
  }
}
