class GlobalException extends Error {
  statusCode: number;
  readonly timestamp: Date;

  constructor(message: string) {
    super(message);
    this.name = "GlobalException";
    this.statusCode = 500;
    this.timestamp = new Date();

    Object.setPrototypeOf(this, GlobalException.prototype);
  }
}

export default GlobalException;
