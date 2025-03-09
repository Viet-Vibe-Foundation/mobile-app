import GlobalException from "./globalException";

class MissingFieldValue extends GlobalException {
  field: string;

  constructor(fieldName: string) {
    super(`Missing field name: ${fieldName}`);
    this.name = "MissingFieldValueException";
    this.statusCode = 400;
    this.field = fieldName;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default MissingFieldValue;
