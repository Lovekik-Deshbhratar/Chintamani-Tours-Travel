import express from "express";
import nodemailer from "nodemailer";

const ContactRoute = express.Router();

ContactRoute.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to support team or admin
    const mainMailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Inquiry from ${fullName}`,
      html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      </body>
    </html>`,
    };

    transporter.sendMail(mainMailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      res.status(200).json({
        success: true,
        message: "Email sent to main address",
      });
    });

    // Send auto-response to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Us",
      html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                }
              </style>
            </head>
            <body>
              <p>Dear ${email},</p>
              <p>Thank you for reaching out to us. We have received your inquiry and will get back to you as soon as possible.</p>
              <p>If you have any urgent questions or need immediate assistance, please feel free to contact our support team.</p>
              <p>Best regards,</p>
            </body>
          </html>
        `,
    };

    await transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      res.status(200).json({
        success: true,
        message: "Autorespond email send",
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while processing your request",
      });
  }
});
export default ContactRoute;
