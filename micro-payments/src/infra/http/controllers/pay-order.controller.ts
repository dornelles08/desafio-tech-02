import { InvalidStatusError } from "@/domain/application/use-cases/errors/invalid-status.error";
import { OrderNotFoundError } from "@/domain/application/use-cases/errors/order-not-fount.error";
import { PayOrderUseCase } from "@/domain/application/use-cases/pay-order";
import {
  BadRequestException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";

@Controller("/orders")
export class PayOrderController {
  constructor(private readonly payOrderUseCase: PayOrderUseCase) {}

  @Put("/:id/pay")
  @HttpCode(204)
  async handle(@Param("id") orderId: string) {
    const result = await this.payOrderUseCase.execute({
      orderId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case OrderNotFoundError:
          throw new NotFoundException(error.message);
        case InvalidStatusError:
          throw new BadRequestException(error.message);
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
