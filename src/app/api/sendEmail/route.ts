import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  email: string;
  orderId: string;
  firstName: string;
  orderItems: { title: string; price: number; quantity: number }[];
}

export async function POST(req: NextRequest) {
  const { email, orderId, firstName, orderItems }: RequestBody =
    await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true,
  });

  const orderList = orderItems
    .map(
      (item) =>
        `<li>${item.title} - RP:${item.price.toFixed(
          2
        )} x ${item.quantity}</li>`
    )
    .join("");

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation - Order #${orderId}`,
    html: ` 
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="text-align: flex-start; color: #B88E2F;">Hello ${firstName},</h2>
    <p>Thank you for shopping with <strong>Furniro Furniture Store</strong>! 🎁</p>
    <p>We're excited to let you know that your order has been successfully placed. 🎉</p>
    
    <h3>Your Order Details:</h3>
    <ul style="list-style: none; padding: 0;">
      ${orderList}
    </ul>
    
    <p><strong>Total:</strong> RP:${totalAmount.toFixed(2)}</p>
    <p>Your parcel will be delivered to you soon! We hope you love your new items. 😊</p>
    
    <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:Zohaibmemon1515@gmail.com">Zohaibmemon1515@gmail.com</a> or call us at <strong>+92-3193852479</strong>.</p>
    <p>Thank you again for choosing <strong>Furniro Furniture Store</strong>! ❤️</p>
    <p>Have a great day! ☀️</p>
    
    <footer style="text-align: center; color: #888; font-size: 12px;">
      <p>This is an automated email. Please do not reply directly to this message.</p>
    </footer>
  </div>
</body>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
