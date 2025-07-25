import { randomUUID } from "node:crypto";
import { makeOrder } from "test/factories/make-order";
import { InMemoryOrderRepository } from "test/repositories/in-memory-order.repository";
import { CreateOrderUseCase } from "./create-order";

let inMemoryOrderRepository: InMemoryOrderRepository;

// System under test
let sut: CreateOrderUseCase;

describe("Create Order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();

    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it("should be able to create an order", async () => {
    const order = makeOrder({
      id: randomUUID(),
      createdAt: new Date(),
    });
    console.log(order);

    const result = await sut.execute({
      id: order.id,
      value: order.value,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      status: order.status,
      createdAt: order.createdAt,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      order: inMemoryOrderRepository.items[0],
    });
  });
});
