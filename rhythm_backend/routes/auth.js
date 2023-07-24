const express= require("express");
const router= express.Router();
const User = require("../models/User");
const bcrypt= require("bcrypt");
const {getToken}=require("../utils/helpers");

//this POST route will help regiter a user
router.post("/register", async (req,res)=>{
    //this code is run when the /register api is called as a POST request

    //my req.body will be of the format {email, password,firstname , lastname,username}
    const {email,password, firstName,lastName,username} = req.body;

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
    const newUserData={
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username
    };
    const newUser = await User.create(newUserData);

    //create the token to return to the user
    const token = await getToken(email,newUser);

    //return the result to the user
    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login",async (req,res)=>{
    //get email and password sent by user from req.body
    const {email,password}=req.body;
    //check if user with the given email exists. If not, the credentials are invalid
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(403).json({err:"User with this email not exists!"})
    }
    //if the user exists, check if the password is correct. If not the credentials are invalid
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(403).json({err:"Invalid Password"})
    }
    //if the credentials are correct return a token to the user
    const token = await getToken(user.email,user);
});

module.exports = router;
