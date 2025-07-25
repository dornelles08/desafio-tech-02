export abstract class MessagingService {
  abstract sendMessage(message: any, event: string): Promise<void>;
}
