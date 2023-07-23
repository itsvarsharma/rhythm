const express= require("express");
const router= express.Router();
const User = require("../models/User");
const bcrypt= require("bcrypt");
const {getToken}=require("../utils/helpers")
//this POST route will help regiter a user
router.post("/register", async (req,res)=>{
    //this code is run when the register api is called a POST request

    //my req.body will be of the format { email, password,firstname , lastname,username}
    const {email,password, firstName,lastName,username}=req.body;

    //does a user with this email already exists? if yes we throw an error
    const user= await User.findOne({email: email});
    if(user){
        //status code by default is 200
        return res
                .status(403)
                .json({error:"User with this email already exists"})
    }
    //this is a valid request

    //create a new user
    //we dont store password as plain text
    //convert it into a hash
    const hashedPassword = bcrypt.hash(password,10);
    const newUserData={email,password: hashedPassword,firstName,lastName,username};
    const newUser = await User.create(newUserData);

    const token = await getToken(email,newUser);

    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;
    return res._construct(200).json(userToReturn);
});