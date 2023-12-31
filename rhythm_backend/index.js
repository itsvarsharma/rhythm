// npm init : paclage.json
//npm i express : express package installed,now project knows that we are using express
//use express

const express=require("express");//express package import in a const var
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");
const User = require("./models/User");
const authRoutes= require("./routes/auth");
const songRoutes= require("./routes/song");
require("dotenv").config();
const app = express(); //app me express ki functionalities add 
const port= 8000;

// console.log(process.env);

app.use(express.json());

//connect mongoose to our node app
//mongoose.connect()takes 2 args 1- which dp to connect (db-url) 2- connection options.
mongoose
    .connect("mongodb+srv://itsvarsharma:"+process.env.MONGO_PASSWORD+"@cluster0.gal63ex.mongodb.net/?retryWrites=true&w=majority",
        //change the mid string to process.env.MONGO_PASSWORD
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        ).then ((x) => {
            console.log("Connected to Mongo!");
        }).catch((err)=>{
            console.log("Error while connecting!")
        });
    
        //setup passport-jwt
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'ThisIsSecret';
    passport.use(
            new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({id: jwt_payload.sub}, function(err, user) {
                //done(error,does the user exist)
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        })
    );


//api: get type: / :return text "Hello world"
app.get("/",(req,res)=>{ // /-> route sec arg-> jab ye req ye route pe ayegi to kya krna hai
    //req contains all data for the request
    //res contains all data for the response
    res.send("Hello World!");
});

app.use("/auth",authRoutes);
app.use("/song",songRoutes);

//tell express to run server on 8000
app.listen(port, ()=>{
    console.log("App is running on "+port);
});
