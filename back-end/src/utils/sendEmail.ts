import { Resend } from "resend";
import { EmailTemplate } from "../../assets/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY_PRODUCTION);

interface EmailTemplateProps {
  firstName: string;
  to: string;
  token: string;
}
export async function sendEmail({ firstName, to, token }: EmailTemplateProps) {
  const { error } = await resend.emails.send({
    from: "VVF Admin <admin.tech@vietvibe.org>",
    to: to,
    subject: "Account verification",
    html: EmailTemplate({ firstName: firstName, token: token }),
  });

  console.log(error);
}
