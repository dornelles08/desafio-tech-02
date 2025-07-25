import { FetchOrdersUseCase } from "@/domain/application/use-cases/fetch-orders";
import { Controller, Get, HttpCode, InternalServerErrorException } from "@nestjs/common";
import { OrderPresenter } from "../presenters/order.presenter";

@Controller("/orders")
export class FetchOrdersController {
  constructor(private readonly fetchOrdersUseCase: FetchOrdersUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.fetchOrdersUseCase.execute();

    if (result.isLeft()) {
      throw new InternalServerErrorException();
    }

    const { orders } = result.value;

    return { orders: orders.map(OrderPresenter.toHTTP) };
  }
}
