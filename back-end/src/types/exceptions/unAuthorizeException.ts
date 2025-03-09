import GlobalException from "./globalException";

class UnAuthorizedException extends GlobalException {
  constructor(message: string) {
    super(`UnAuthorized: ${message}`);
    this.statusCode = 401;

    Object.setPrototypeOf(this, UnAuthorizedException.prototype);
  }
}

export default UnAuthorizedException;
