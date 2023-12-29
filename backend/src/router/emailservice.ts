import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   
    host: 'smtp.ethereal.email',
    //host: 'smtp.gmail.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_test,
        pass: process.env.EMAIL_password_test
    },
  });
  export default async function sendEmail(order:any,user:any) {
    try{
      console.log(user)
      const fromName = "Flavor Fleet 👩‍🍳";
const fromEmail = process.env.EMAIL_test;
const from = `"${fromName}" <${fromEmail}>`;
console.log(from+"  "+process.env.EMAIL_password_test);
      const orderItemsHTML = order.items.map((item: any) => `
            <li>
                <strong>Name:</strong> ${item.name}<br>
                <strong>Price:</strong> ${item.price}<br>
                <strong>Quantity:</strong> ${item.quantity}
            </li>
        `).join('');
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: from, // sender address
      to: user.email, // list of receivers
      subject: "Order Detail", // Subject line
      text: "Hello world?", // plain text body
      html: ` <p>Hello ${user.name},</p>
      <p>Your order details:</p>
      <ul>${orderItemsHTML}</ul>
      <p><strong>Total Price:</strong> ${order.totalPrice}</p>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
} catch (error) {
  console.error('Error sending email:', error);
  throw error; // Propagate the error to the caller
}
}
