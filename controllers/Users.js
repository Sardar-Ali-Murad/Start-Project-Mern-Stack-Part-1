import Auth from "../models/Auth.js"
import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import VerificationEmail from "../utlis/VerificationEmail.js"
import ResetPassword from "../utlis/ResetPassword.js"

import  UniqueStringGenerator from "unique-string-generator"

let Register=async (req,res)=>{
    let {name,password,email}=req.body

    if(!name || !password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }

    let emailAlreadyExists=await Auth.findOne({email})

    if(emailAlreadyExists){
        throw new BadRequestError("Email Already Exists")
    }
  
    let  VerificationToken=UniqueStringGenerator.UniqueString()

    


    let origin="http://localhost:3000"

    let user=await Auth.create({name,password,email,VerificationToken})

    await VerificationEmail({name,origin,email,VerificationToken})

    let token =user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user:{name,email},
        token:token
    })
}


const VerifyEmail=async (req,res)=>{
    let {token,email}=req.body
    let user=await Auth.findOne({email})

    if(!user){
        throw new BadRequestError("The User is not there")
    }

    if(user.VerificationToken!==token){
        throw new BadRequestError("The token is not correct")
    }

    user.isVerified=true
    user.VerificationToken=""
    user.VerifiedDate=new Date()

    await user.save()

    res.status(StatusCodes.OK).json({msg:"The User Is verified successfully"})
}



let Login=async (req,res)=>{
    let {password,email}=req.body
    
    if(!password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }
    
    let user=await Auth.findOne({email})
    if(!user){
        throw new BadRequestError("User Does Not Exists")
    }

    if(user.isVerified===false){
        throw new BadRequestError("You Have Registered But Not Have Vefified Your Email")
    }

    let isPasswordCorrect=await user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new BadRequestError('Password is not correct')
    }
   
    
    let token =user.createJWT()
    
    res.status(StatusCodes.CREATED).json({
        user:{name:user.name,email},
        token:token

    })
    
}


const resetPassword=async (req,res)=>{
    let {email}=req.body

    if(!email){
        throw new BadRequestError("Please Provide The Email")
    }

    let user=await Auth.findOne({email})

    if(!user){
        throw new BadRequestError("Your Email does not exists")
    }

    let name=user.name
 
    let  ResetPasswordVerificationToken=UniqueStringGenerator.UniqueString()

    


    let origin="http://localhost:3000"

    user.ResetPasswordVerificationToken=ResetPasswordVerificationToken

    // let oneMinute=6000milliseconds

    user.ResetPasswordVerificationTokenDate=new Date().getTime()+60000

    await user.save()


    await ResetPassword({name,origin,email,VerificationToken:ResetPasswordVerificationToken})

    res.status(StatusCodes.OK).json({msg:"Ok Please Check email and create new password"})

}

const ResetPasswordComplete=async (req,res)=>{
    let {token,email,newPassword}=req.body

    if(!token || !email || !newPassword){
        throw new BadRequestError("Some is missing from email,token or the password")
    }

    let user=await Auth.findOne({email})

    if(user.ResetPasswordVerificationToken!==token){
        throw new BadRequestError("The Token is not correct")
    }

    let ResetPasswordExpirationTime=user.ResetPasswordVerificationTokenDate
    let currentTime=new Date().getTime()

    if(currentTime>ResetPasswordExpirationTime){
        throw new BadRequestError("Soory The Token Is Expired Please Repeat The Process Again")
    }

    user.ResetPasswordVerificationToken=""
    user.ResetPasswordVerificationTokenDate=""

    user.password=newPassword

    await user.save()

    res.status(StatusCodes.OK).json({msg:"Ok!You have resetPassword successfully now login Again"})
}





export {Register,Login,VerifyEmail,resetPassword,ResetPasswordComplete}