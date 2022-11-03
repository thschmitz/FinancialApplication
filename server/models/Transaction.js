import mongoose from "mongoose";


const TransactionSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    subtitle: {
        type: String,
        required:true,
    },
    value: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required:true,
    },
}, {timestamps:true})

export default mongoose.model("Transaction", TransactionSchema);