const mongoose = require("mongoose");
//create a mingoose
//step1 require mongoose
//step2 create a mongoose schema
//step3 create a model

const PlayList = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },


    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "song",
        },
    ],
    collaborators: [
        {
            type:mongoose.Types.ObjectId,
            ref: "user",
        },
    ],
});

const PlayListModel= mongoose.model("PlayList",PlayList);

module.exports = PlayListModel;