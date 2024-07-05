const nodemailer = require("nodemailer");

// Use real credentials for a real email service provider
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-gmail-address@gmail.com",
    pass: "your-gmail-password", // Use an app-specific password if 2FA is enabled
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <your-gmail-address@gmail.com>', // sender address
    to: "sandeepanx@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <some-message-id@some-email-service>
}

main().catch(console.error);
