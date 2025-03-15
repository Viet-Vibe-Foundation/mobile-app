interface EmailTemplateProps {
  firstName: string;
  token: string;
}

export const EmailTemplate = ({ firstName, token }: EmailTemplateProps) => {
  // const testlink = `http://localhost:8000/verifyAccount?token=${token}`;
  const prodLink = `https://www.vietvibe.org/verifyAccount?token=${token}`;
  return `<div>
      <h1>Welcome, ${firstName}!</h1>
      <p>
        <a href=${prodLink}>Click</a> here to verify your account
      </p>
    </div>
    `;
};
