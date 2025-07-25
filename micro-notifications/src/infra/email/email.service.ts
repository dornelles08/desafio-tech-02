import { EmailService } from "@/domain/application/email/email";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NodemailerService implements EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html: body,
    });
  }
}
