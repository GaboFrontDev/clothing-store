export class AuthenticationError extends Error {
  public static UNSUPPORTED_TYPE: string =
    "Please provide a 'String', 'Uint8Array' or 'Array'.";

  constructor(
    public message = "Message not provided"
  ) {
    super(message);
    this.name = "UnexpectedInput";
    this.stack = (<any>new Error()).stack;
  }
}
