import axios from "axios";
// import { smtpexpressClient } from "./smtp";

export const sendEmailsToCelebrants = async (userEmail: string) => {
  //use Axios to make a POST request;
  const api = axios.create({
    baseURL: "https://api.smtpexpress.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_SMTP_PROJECT_SECRET}`,
    },
  });

  try {
    const body = {
      subject: "Confirmation: Email sent successfully",
      message: `
      Dear <b>[Name]</b>,<br><br>

        The Nigerian Federation of Catholic Students (NFCS) family is thrilled to celebrate your birthday today! We wanted to take a moment to express our appreciation for your presence in our community. You are loved and valued for your <b>[positive quality or contribution to the community]</b>.<br><br>

        May your day be filled with joy, laughter, and blessings.<br><br>

        Happy Birthday!<br><br>

        Warmly,<br><br>
        The NFCS Team
      `,
      sender: {
        name: "NFCS OAU",
        // email: `${process.env.REACT_SMTP_PROJECT_SENDER_EMAIL}`,
        email: "sm0pid-ak4tD8XbEBhJmRd6HV3Tp11O9@projects.smtpexpress.com",
      },
      recipients: {
        email: userEmail,
      },
    };

    const response = await api.post("send", body);
    // console.log(response.data);
    // alert("Please check your email to view the sent message.");
  } catch (error) {
    // alert("Oops! Something went wrong. Please try again later.");
    console.log("Error sending email:", error);
  }
};
