import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Create Order (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  it("[POST] /accounts", async () => {
    const response = await request(app.getHttpServer()).post("/orders").send({
      value: 1000,
      customerEmail: "john.doe@example.com",
      customerName: "John Doe",
    });

    expect(response.statusCode).toBe(201);

    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        customer_name: "John Doe",
      },
    });

    expect(orderOnDatabase).toBeTruthy();
  });
});
