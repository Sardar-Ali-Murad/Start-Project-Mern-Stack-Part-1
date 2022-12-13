import SendEmail from "./SendEmail.js"


const VerificationEmail =async ({name,origin,email,VerificationToken}) => {
  const Path=`${origin}/api/v1/verifyEmail?token=${VerificationToken}&email=${email}`
  let message=`<a href=${Path}>Vefify Email</a>`

  await SendEmail({
    to:email,
    subject:"Email Verification",
    html:message,
    name
  })

 


  
}

export default VerificationEmail