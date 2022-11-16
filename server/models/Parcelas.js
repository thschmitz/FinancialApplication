import mongoose from "mongoose";


const ParcelaSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    value: {
        type: Number,
        required: true,
    },
    days: {
        type: Array,
        required: true,
    },
    daysPassed: {
        type: Array
    },
    numero: {
        type: Number,
        required:true,
    },
    time: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required:true,
    },
}, {timestamps:true})

export default mongoose.model("Parcelas", ParcelaSchema);