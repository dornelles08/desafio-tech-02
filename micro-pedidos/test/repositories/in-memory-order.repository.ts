import { OrderRepository } from "@/domain/application/repositories/order.repository";
import { Order } from "@/domain/enterprise/entities/Order";

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = [];

  async create(data: Order): Promise<void> {
    this.items.push(data);
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((order) => order.id === id);
    return order || null;
  }

  async update(data: Order): Promise<void> {
    const index = this.items.findIndex((order) => order.id === data.id);

    this.items[index] = data;
  }
}
