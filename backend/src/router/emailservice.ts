import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'audra70@ethereal.email',
        pass: 'Af8HdgGfMFjfcsBmSG'
    },
  });
  export default async function sendEmail() {
    try{
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Flavor Fleet 👩‍🍳" <flaverfleet@example.com>', // sender address
      to: "vs1313046@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?<button>How ?<button></b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
} catch (error) {
  console.error('Error sending email:', error);
  throw error; // Propagate the error to the caller
}
}
