import { Order } from "@/domain/enterprise/entities/Order";

export interface OrderRepository {
  create(data: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  update(data: Order): Promise<void>;
}
