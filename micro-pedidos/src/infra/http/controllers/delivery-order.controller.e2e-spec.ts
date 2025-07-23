import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { OrderFactory } from "test/factories/make-order";

describe("Delivery Order (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let orderFactory: OrderFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    orderFactory = moduleRef.get(OrderFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it("[PUT] /orders/:id/delivery", async () => {
    const order = await orderFactory.makePrismaOrder({
      status: "pago",
    });

    const response = await request(app.getHttpServer()).put(`/orders/${order.id}/delivery`).send();

    expect(response.statusCode).toBe(204);

    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        id: order.id,
      },
    });

    expect(orderOnDatabase).toBeTruthy();
    expect(orderOnDatabase?.status).toBe("finalizado");
  });
});
