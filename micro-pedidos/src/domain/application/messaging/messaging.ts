export abstract class MessagingService {
  abstract sendMessage(message: string): Promise<void>;
}
