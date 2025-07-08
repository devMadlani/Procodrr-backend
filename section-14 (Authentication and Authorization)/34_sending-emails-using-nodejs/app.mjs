import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "madlanidev@gmail.com",
    pass: "pcet alau trzb zacd",
  },
});

const info = await transporter.sendMail({
  from: "Dev Madlani <madlanidev@gmail.com>",
  to: "devm.dds@gmail.com",
  subject: "Hello World 2",
  html: `<h2 style="color: orange;">Hello world?</h2>`,
});

console.log("Message sent: %s", info.messageId);
