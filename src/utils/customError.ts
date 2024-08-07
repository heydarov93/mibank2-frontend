export class CustomError<T> extends Error {
  details: T;

  constructor(message: string, details: T) {
    super(message);
    this.details = details;
  }
}
