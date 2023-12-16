export class CookieError extends Error {
    public static UNSUPPORTED_TYPE: string =
      "Please provide a 'String', 'Uint8Array' or 'Array'.";
  
    constructor(
      public message = "Cookies error happened"
    ) {
      super(message);
      this.name = "UnexpectedCookie";
      this.stack = (<any>new Error()).stack;
    }
  }
  