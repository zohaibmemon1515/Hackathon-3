import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  email: string;
  username: string
}

export async function POST(req: NextRequest) {
  const { email, username }: RequestBody = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true, 
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Furniro!",
    html: `
     <html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .email-header h1 {
        color: #B88E2F;
        font-size: 24px;
        margin-top: 10px;
      }
      .email-body {
        font-size: 12px;
        line-height: 1.6;
        color: #555;
        margin-bottom: 20px;
      }
      .cta-button {
        display: inline-block;
        background-color: #B88E2F;
        color: white;
        font-size: 16px;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 50px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .cta-button:hover {
        background-color: #b88e2f;
        text-decoration: none;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 14px;
        color: #aaa;
      }
      .footer a {
        color: #B88E2F;
        text-decoration: none;
      }
      .icon {
        font-size: 20px;
        color: #B88E2F;
        margin-right: 8px;
      }
      .icon-container {
        display: inline-flex;
        align-items: center;
      }
      @media (max-width: 600px) {
        .email-container {
          padding: 20px;
        }
        .email-header h1 {
          font-size: 28px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Welcome to Furniro, ${username}!</h1>
      </div>
      <div class="email-body">
        <p>
          We are thrilled to have you on board. Your account has been successfully created, and you are now part of the <strong>Furniro</strong> community.
        </p>
        <p>
          Explore your dashboard, track your orders, and stay updated with the latest deals and promotions.
        </p>
        <p>
          If you did not sign up for an account with us, please disregard this email or reach out to our support team.
        </p>
        <p>
          <a href="https://furniro-ecommerce-web.vercel.app" class="cta-button">
            Go to Dashboard
          </a>
        </p>
      </div>
      <div class="footer">
        <p>Thank you for joining us!</p>
        <div class="icon-container">
          <span class="icon">&#9733;</span> <span>Furniro Team</span>
        </div>
      </div>
    </div>
  </body>
</html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
  }
}



