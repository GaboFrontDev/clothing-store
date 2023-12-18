export class UserNotVerifiedError extends Error {
  
    constructor(
      public message = "User account not verified"
    ) {
      super(message);
      this.name = "UserNotVerified";
      this.stack = (<any>new Error()).stack;
    }
  }
  