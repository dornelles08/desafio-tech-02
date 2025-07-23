import { MessagingService } from "@/domain/application/messaging/messaging";

export class FakeMensaging implements MessagingService {
  async sendMessage(message: any, event: string): Promise<void> {
    console.log(`Fake message sent to event ${event}:`, message);
  }
}
