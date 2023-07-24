const mongoose = require("mongoose");
//create a mingoose
//step1 require mongoose
//step2 create a mongoose schema
//step3 create a model

const Song = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        // required: true,
    },
    
});

const SongModel= mongoose.model("Song",Song);

module.exports = SongModel;