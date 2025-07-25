import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/either";
import { Order } from "src/domain/enterprise/entities/Order";
import { MessagingService } from "../messaging/messaging";
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
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly menssagingService: MessagingService
  ) {}

  async execute({ orderId }: PayOrderUseCaseRequest): Promise<PayOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }
    if (order.status !== "criado") {
      return left(new InvalidStatusError(order.status, "pay"));
    }

    order.status = "pago";

    await this.orderRepository.save(order);

    await this.menssagingService.sendMessage(
      {
        id: order.id,
        status: order.status,
        value: order.value,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        createdAt: order.createdAt,
      },
      "order.paied"
    );

    return right({ order });
  }
}
