import express from "express"
let router=express.Router()

import {Login,Register,VerifyEmail,resetPassword,ResetPasswordComplete} from "../controllers/Users.js"

router.route("/register").post(Register)
router.route("/verifyEmail").post(VerifyEmail)
router.route("/login").post(Login)
router.route("/resetPassword").post(resetPassword)
router.route("/resetPasswordComplete").post(ResetPasswordComplete)


export default router