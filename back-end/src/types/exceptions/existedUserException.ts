import GlobalException from "./globalException";

class ExistedUserException extends GlobalException {
  resource: string;

  constructor(resource: string) {
    super(`This user is already exist with email or phone: ${resource}`);
    this.name = "Existed User Exception";
    this.statusCode = 400;
    this.resource = resource;

    Object.setPrototypeOf(this, ExistedUserException.prototype);
  }
}

export default ExistedUserException;
