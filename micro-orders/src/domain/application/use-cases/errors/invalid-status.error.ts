export class InvalidStatusError extends Error {
  constructor(status?: string, operation?: string) {
    super(
      `Invalid status${status ? `: ${status}` : ""}${
        operation ? ` for operation: ${operation}` : ""
      }.`
    );
  }
}
