import { Either, left, right } from "@/core/either";
import { Order } from "@/domain/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../repositories/order.repository";
import { InvalidStatusError } from "./errors/invalid-status.error";
import { OrderNotFoundError } from "./errors/order-not-fount.error";

interface PayOrderUseCaseRequest {
  orderId: string;
}

type PayOrderUseCaseResponse = Either<
  OrderNotFoundError | InvalidStatusError,
  {
    order: Order;
  }
>;

@Injectable()
export class PayOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ orderId }: PayOrderUseCaseRequest): Promise<PayOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }
    if (order.status !== "criado") {
      return left(new InvalidStatusError(order.status, "Pay"));
    }

    order.status = "pago";

    await this.orderRepository.save(order);

    return right({ order });
  }
}
