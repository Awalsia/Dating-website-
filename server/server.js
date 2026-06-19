const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://dating-website-stefano.netlify.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dating App Backend Running ❤️");
});

app.post("/api/date-request", async (req, res) => {
  const { name, email, activity, date, time, timeComment } = req.body;

  if (!name || !email || !activity || !date || !time) {
    return res.status(400).json({
      message: "Name, email, activity, date and time are required",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const senderName = `"Stefano Fabiano ❤️" <${process.env.EMAIL_USER}>`;

    await transporter.sendMail({
      from: senderName,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: "New date request ❤️",
      text: `
Someone said YES ❤️

Name: ${name}
Email: ${email}
Activity: ${activity}
Date: ${date}
Time: ${time}
Comment: ${timeComment}

Message: They accepted your date request!
      `,
    });

    await transporter.sendMail({
      from: senderName,
      replyTo: process.env.EMAIL_USER,
      to: email,
      subject: "Your date request was sent ❤️",
      text: `
Hi ${name} ❤️

Your date request has been sent!

Here are the details:

Activity: ${activity}
Date: ${date}
Time: ${time}
${timeComment}

I'll contact you soon 💌
      `,
    });

    return res.status(200).json({
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);

    return res.status(500).json({
      message: "Email could not be sent",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
