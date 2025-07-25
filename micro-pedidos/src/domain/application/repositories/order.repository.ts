import { Order } from "@/domain/enterprise/entities/Order";

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findAll(): Promise<Order[]>;
  abstract save(order: Order): Promise<void>;
}
