import nodemailer from "nodemailer"

const SendEmail =async ({html,subject,to,name}) => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'brandy9@ethereal.email',
          pass: '9C3sbcqYSvvj9ejHEw'
      }
  });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"SardarAliMuradAli 👻" <sardar@gmail.com>', // sender address
      to:to, // list of receivers
      subject: subject, // Subject line
      text: `Hello ${name}`, // plain text body
      html: html, // html body
    });  
} 

export default SendEmail
