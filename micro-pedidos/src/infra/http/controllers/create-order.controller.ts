import { CreateOrderUseCase } from "@/domain/application/use-cases/create-order";
import { Body, Controller, HttpCode, InternalServerErrorException, Post } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const createOrderBodySchema = z.object({
  value: z.coerce.number().positive(),
  customerEmail: z.email(),
  customerName: z.string(),
});

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema);

@Controller("/orders")
export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateOrderBodySchema) {
    const { customerName, customerEmail, value } = body;

    const result = await this.createOrderUseCase.execute({
      customerName,
      customerEmail,
      value,
    });

    if (result.isLeft()) {
      throw new InternalServerErrorException();
    }
  }
}
