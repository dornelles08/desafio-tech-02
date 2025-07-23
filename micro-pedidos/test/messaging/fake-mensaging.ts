import { MessagingService } from "@/domain/application/messaging/messaging";

export class FakeMensaging implements MessagingService {
  async sendMessage(message: any): Promise<void> {
    console.log("Fake message sent:", message);
  }
}
