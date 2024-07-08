import { createClient } from "smtpexpress";

export const smtpexpressClient = createClient({
  projectId: `${process.env.REACT_SMTP_PROJECT_ID}`,
  projectSecret: `${process.env.REACT_SMTP_PROJECT_SECRET}`,
});
