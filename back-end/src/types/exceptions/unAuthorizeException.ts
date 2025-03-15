import GlobalException from "./globalException";

class UnAuthorizedException extends GlobalException {
  isSendMail: boolean;

  constructor(message: string, isSendMail: boolean = false) {
    super(
      `UnAuthorized: ${message} ${
        isSendMail ? "please check your mail to verify" : null
      }`
    );
    this.statusCode = 401;
    this.isSendMail = isSendMail;

    Object.setPrototypeOf(this, UnAuthorizedException.prototype);
  }
}

export default UnAuthorizedException;
