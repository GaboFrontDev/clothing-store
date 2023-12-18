export class UserExistsError extends Error {
    public static UNSUPPORTED_TYPE: string =
      "Please provide a 'String', 'Uint8Array' or 'Array'.";
  
    constructor(
      public message = "User already exists"
    ) {
      super(message);
      this.name = "UserAlreadyInUse";
      this.stack = (<any>new Error()).stack;
    }
  }
  