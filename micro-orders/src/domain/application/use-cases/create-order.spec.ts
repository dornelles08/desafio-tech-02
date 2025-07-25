import { makeOrder } from "test/factories/make-order";
import { FakeMensaging } from "test/messaging/fake-mensaging";
import { InMemoryOrderRepository } from "test/repositories/in-memory-order.repository";
import { MockInstance } from "vitest";
import { CreateOrderUseCase } from "./create-order";

let inMemoryOrderRepository: InMemoryOrderRepository;
let fakeMensaging: FakeMensaging;
let sendMessageExecuteSpy: MockInstance;

// System under test
let sut: CreateOrderUseCase;

describe("Create Order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    fakeMensaging = new FakeMensaging();

    sendMessageExecuteSpy = vi.spyOn(fakeMensaging, "sendMessage");

    sut = new CreateOrderUseCase(inMemoryOrderRepository, fakeMensaging);
  });

  it("should be able to create an order", async () => {
    const order = makeOrder();

    const result = await sut.execute({
      value: order.value,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      order: inMemoryOrderRepository.items[0],
    });

    expect(sendMessageExecuteSpy).toHaveBeenCalled();
  });
});
