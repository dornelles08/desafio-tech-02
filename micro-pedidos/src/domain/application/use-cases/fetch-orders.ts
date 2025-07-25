import { Either, right } from "@/core/either";
import { Order } from "@/domain/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../repositories/order.repository";

type FetchOrdersUseCaseResponse = Either<null, { orders: Order[] }>;

@Injectable()
export class FetchOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findAll();

    return right({ orders });
  }
}
