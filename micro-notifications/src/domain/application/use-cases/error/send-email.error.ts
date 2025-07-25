export class SendEmailError extends Error {
  constructor(message: string) {
    super(`SendEmailError: ${message}`);
  }
}
