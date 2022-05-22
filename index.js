const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();


const port = 9000;

app.use(express.json());

let mailTransporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.get("/mail", (req, res) => {
  if (req.query) {
    let mailDetails = {
      from: "shubham.cc@outlook.com",
      to: req.query.email,
      subject: "Test mail",
      text: "Node.js",
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        res.sendStatus(404).send({ error: err });
      } else {
        res.sendStatus(200).send({ message: "Email Sent successfully" });
      }
    });
  } else {
    res.sendStatus(200).send({ message: "Please send email" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
