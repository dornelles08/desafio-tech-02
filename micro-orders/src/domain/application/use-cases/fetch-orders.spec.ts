import { makeOrder } from "test/factories/make-order";
import { InMemoryOrderRepository } from "test/repositories/in-memory-order.repository";
import { FetchOrdersUseCase } from "./fetch-orders";

let inMemoryOrderRepository: InMemoryOrderRepository;

// System under test
let sut: FetchOrdersUseCase;

describe("Fetch Order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();

    sut = new FetchOrdersUseCase(inMemoryOrderRepository);
  });

  it("should be able to fetch orders", async () => {
    const order = makeOrder();
    inMemoryOrderRepository.items.push(order);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value?.orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: order.id,
        }),
      ])
    );
  });
});
