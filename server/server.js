const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
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
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const senderName = `"Stefano Fabiano ❤️" <${process.env.EMAIL_USER}>`;

    await transporter.sendMail({
      from: senderName,
      replyTo: process.env.EMAIL_USER,
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

    res.status(200).json({
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Email could not be sent",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});