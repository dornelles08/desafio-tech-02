import { Order } from "@/domain/enterprise/entities/Order";

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      value: order.value,
      status: order.status
    };
  }
}
