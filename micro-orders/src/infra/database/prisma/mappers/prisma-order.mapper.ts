import { Order } from "@/domain/enterprise/entities/Order";
import { Status } from "@/domain/enterprise/entities/Status";
import { Prisma, Order as PrismaOrder } from "@prisma/client";

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return new Order(
      {
        customerEmail: raw.customer_email,
        customerName: raw.customer_name,
        value: raw.value,
        status: raw.status as Status,
        createdAt: raw.createdAt,
      },
      raw.id
    );
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id,
      status: order.status,
      value: order.value,
      customer_email: order.customerEmail,
      customer_name: order.customerName,
    };
  }
}
