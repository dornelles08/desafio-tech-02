export class OrderNotFoundError extends Error {
  constructor(details?: string) {
    super(`Order not found${details ? ` - [${details}]` : ""}.`);
  }
}
