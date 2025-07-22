import { Either, right } from "@/core/either";
import { Order } from "@/domain/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../repositories/order.repository";

interface CreateOrderUseCaseRequest {
  value: number;
  customerName: string;
  customerEmail: string;
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
    value,
    customerEmail,
    customerName,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = new Order({ value, customerEmail, customerName, status: "criado" });

    await this.orderRepository.create(order);

    return right({ order });
  }
}
