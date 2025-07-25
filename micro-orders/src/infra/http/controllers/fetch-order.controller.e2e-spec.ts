import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { OrderFactory } from "test/factories/make-order";

describe("Delivery Order (E2E)", () => {
  let app: INestApplication;
  let orderFactory: OrderFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    orderFactory = moduleRef.get(OrderFactory);

    await app.init();
  });

  it("[GET] /orders/", async () => {
    await orderFactory.makePrismaOrder({
      customerName: "Cliente Test",
    });

    const response = await request(app.getHttpServer()).get(`/orders`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      orders: expect.arrayContaining([
        expect.objectContaining({
          customerName: "Cliente Test",
        }),
      ]),
    });
  });
});
