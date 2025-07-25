import { EmailService } from "@/domain/application/email/email";

export class FakeEmail implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {}
}
