const mongoose=require("mongoose");
//create a mingoose
//step1 require mongoose
//step2 create a mongoose schema
//step3 create a model
const User=new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        
        type: String, //we'll change it to array later
        default: "",
    },
    likedPlaylists: {
        type: String, //we'll change it to array later
        default: "",
    },
    subscribedArtists: {
        type: String, //we'll change it to array later
        default: "",
    },

});

const UserModel= mongoose.model("User",User);

module.exports = UserModel;