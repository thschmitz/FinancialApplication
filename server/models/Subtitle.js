import mongoose from "mongoose";


const SubtitleSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique:true,
    },
    userID: {
        type: String,
        required:true,
    },
}, {timestamps:true})

export default mongoose.model("Substitle", SubtitleSchema);