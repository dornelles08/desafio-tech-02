import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/either";
import { EmailService } from "../email/email";
import { SendEmailError } from "./error/send-email.error";

interface OrderNotifyRequest {
  order: {
    id: string;
    status: string;
    value: number;
    customerName: string;
    customerEmail: string;
    createdAt: string;
  };
  eventType: "creadted" | "deliveried" | "paied";
}

type OrderNotifyResponse = Either<SendEmailError, null>;

@Injectable()
export class OrderNotify {
  constructor(private readonly emailService: EmailService) {}

  async execute({ order, eventType }: OrderNotifyRequest): Promise<OrderNotifyResponse> {
    try {
      const infoBasedOnEventtype = {
        creadted: "Criado",
        paied: "Pago",
        deliveried: "Entregue",
      };
      await this.emailService.sendEmail(
        order.customerEmail,
        `Pedido ${infoBasedOnEventtype[eventType]}`,
        `
          <h1>Pedido ${infoBasedOnEventtype[eventType]}</h1>
          <p>Olá ${order.customerName},</p>
          <p>Seu pedido de ID <strong>${order.id}</strong> foi ${infoBasedOnEventtype[eventType].toLowerCase} com sucesso.</p>
          <p>Status: ${order.status}</p>
          <p>Valor: ${order.value}</p>
          <p>Criado em: ${order.createdAt}</p>
          <p>Obrigado pelo seu pedido!</p>
        `
      );

      return right(null);
    } catch {
      return left(new SendEmailError("Error to send email notification"));
    }
  }
}
