import GlobalException from "./globalException";

class NotFoundException extends GlobalException {
  resource: string;

  constructor(resource: string) {
    super(`Not found ${resource}`);
    this.name = "NotFoundException";
    this.statusCode = 404;
    this.resource = resource;

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export default NotFoundException;
