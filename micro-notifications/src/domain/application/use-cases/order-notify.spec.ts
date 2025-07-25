import { faker } from "@faker-js/faker";
import { FakeEmail } from "test/email/fakeEmail";
import { MockInstance } from "vitest";
import { OrderNotify } from "./order-notify";

let fakeEmail: FakeEmail;
let sendEmailExecuteSpy: MockInstance;

// System under test
let sut: OrderNotify;

describe("Order Notify", () => {
  beforeEach(() => {
    fakeEmail = new FakeEmail();

    sendEmailExecuteSpy = vi.spyOn(fakeEmail, "sendEmail");

    sut = new OrderNotify(fakeEmail);
  });

  it("should be able to notify a order", async () => {
    const result = await sut.execute({
      order: {
        id: faker.string.uuid(),
        value: faker.number.int({ min: 100, max: 100000 }),
        status: "finalizado",
        customerEmail: faker.internet.email(),
        customerName: faker.person.fullName(),
        createdAt: faker.date.anytime().toISOString(),
      },
      eventType: "creadted",
    });

    expect(result.isRight()).toBe(true);

    expect(sendEmailExecuteSpy).toHaveBeenCalled();
  });
});
