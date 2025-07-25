import { Order } from "@/domain/enterprise/entities/Order";

export class OrderPresenter {
  static toHTTP(account: Order) {
    return {
      id: account.id,
      customerName: account.customerName,
      customerEmail: account.customerEmail,
      value: account.value,
    };
  }
}
