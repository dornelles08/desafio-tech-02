import { makeOrder } from "test/factories/make-order";
import { InMemoryOrderRepository } from "test/repositories/in-memory-order.repository";
import { InvalidStatusError } from "./errors/invalid-status.error";
import { OrderNotFoundError } from "./errors/order-not-fount.error";
import { PayOrderUseCase } from "./pay-order";

let inMemoryOrderRepository: InMemoryOrderRepository;

// System under test
let sut: PayOrderUseCase;

describe("Pay Order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();

    sut = new PayOrderUseCase(inMemoryOrderRepository);
  });

  it("should be able to pay an order", async () => {
    const order = makeOrder({ status: "criado" });
    inMemoryOrderRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id!,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      order: inMemoryOrderRepository.items[0],
    });
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        status: "pago",
      })
    );
  });

  it("should not be able to pay an unexist order", async () => {
    const result = await sut.execute({
      orderId: "unexist-order-id",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderNotFoundError);
  });

  it("should be able to pay an order", async () => {
    const order = makeOrder({ status: "pago" });
    inMemoryOrderRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id!,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidStatusError);
  });
});
