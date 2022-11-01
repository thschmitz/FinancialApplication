import mongoose from "mongoose";


const TransactionSchema = new mongoose.Schema({
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
    qtd: {
        type: Number,
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

export default mongoose.model("Transaction", TransactionSchema);