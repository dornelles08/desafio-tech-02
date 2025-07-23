export abstract class MessagingService {
  abstract sendMessage(message: any): Promise<void>;
}
