import { Either, left, right } from "@/core/either";
import { Order } from "@/domain/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";
import { MessagingService } from "../messaging/messaging";
import { OrderRepository } from "../repositories/order.repository";
import { InvalidStatusError } from "./errors/invalid-status.error";
import { OrderNotFoundError } from "./errors/order-not-fount.error";

interface DeliveryOrderUseCaseRequest {
  orderId: string;
}

type DeliveryOrderUseCaseResponse = Either<
  OrderNotFoundError | InvalidStatusError,
  {
    order: Order;
  }
>;

@Injectable()
export class DeliveryOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly menssagingService: MessagingService
  ) {}

  async execute({ orderId }: DeliveryOrderUseCaseRequest): Promise<DeliveryOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }
    if (order.status !== "pago") {
      return left(new InvalidStatusError(order.status, "delivery"));
    }

    order.status = "finalizado";

    await this.orderRepository.save(order);

    await this.menssagingService.sendMessage(order, "update-order");

    return right({ order });
  }
}
