import { makeOrder } from "test/factories/make-order";
import { FakeMensaging } from "test/messaging/fake-mensaging";
import { InMemoryOrderRepository } from "test/repositories/in-memory-order.repository";
import { MockInstance } from "vitest";
import { DeliveryOrderUseCase } from "./delivery-order";
import { InvalidStatusError } from "./errors/invalid-status.error";
import { OrderNotFoundError } from "./errors/order-not-fount.error";

let inMemoryOrderRepository: InMemoryOrderRepository;
let fakeMensaging: FakeMensaging;
let sendMessageExecuteSpy: MockInstance;

// System under test
let sut: DeliveryOrderUseCase;

describe("Create Order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    fakeMensaging = new FakeMensaging();

    sendMessageExecuteSpy = vi.spyOn(fakeMensaging, "sendMessage");

    sut = new DeliveryOrderUseCase(inMemoryOrderRepository, fakeMensaging);
  });

  it("should be able to delivery an order", async () => {
    const order = makeOrder({ status: "pago" });
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
        status: "finalizado",
      })
    );

    expect(sendMessageExecuteSpy).toHaveBeenCalled();
  });

  it("should not be able to delivery an unexist order", async () => {
    const result = await sut.execute({
      orderId: "unexist-order-id",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderNotFoundError);
  });

  it("should be able to create an order", async () => {
    const order = makeOrder({ status: "criado" });
    inMemoryOrderRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id!,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidStatusError);
  });
});
