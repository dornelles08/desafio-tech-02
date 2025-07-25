import { Either, right } from "@/core/either";
import { Order } from "@/domain/enterprise/entities/Order";
import { Status } from "@/domain/enterprise/entities/Status";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../repositories/order.repository";

interface CreateOrderUseCaseRequest {
  id: string;
  status: Status;
  value: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order;
  }
>;

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    id,
    value,
    customerEmail,
    customerName,
    status,
    createdAt,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = new Order(
      {
        value,
        customerEmail,
        customerName,
        status,
        createdAt: new Date(createdAt),
      },
      id
    );

    await this.orderRepository.create(order);

    return right({ order });
  }
}
