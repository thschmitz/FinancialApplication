import { createError } from "../error.js";
import Transaction from "../models/Transaction.js";


export const addTransaction = async(req, res, next) => {
    var partesTime = req.body.time.split("-");

    var timeFinal = partesTime[2] + "/" + partesTime[1] + "/" + partesTime[0];
    const transaction = new Transaction({name: req.body.name, subtitle: req.body.subtitle, value: req.body.value, time: timeFinal, state: req.body.state, userID: req.user.id});
    try{
        await transaction.save();
        res.status(200).send("Transaction has been created!");
    } catch(err) {
        next(createError(err));
    }
}

export const deleteTransaction = async(req, res, next) => {
    try{
        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json("The transaction has been deleted!");
    } catch(err) {
        next(createError(err));
    }
}

export const updateTransaction = async(req, res, next) => {
    try{
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction) return next(createError(404, "Transaction not found!"));

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true})
        
        res.status(200).json(updatedTransaction);
    } catch(err){
        next(createError(err));
    }
}

export const getTransaction = async(req, res, next) => {
    try{
        const transaction = await Transaction.find({userID: req.user.id });
        console.log("TransactionReturn: " , transaction);
        
        res.status(200).json(transaction);
    } catch(err) {
        next(createError(err));
    }
}


/*
export const changeTransactionState = async(req, res, next) => {
    try{
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction) return next(createError(404, "Transaction not found!"));

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, {
            $state: req.body.state,
        })

        res.status(200).json(updatedTransaction);

    } catch (err) {
        next(createError(err));
    }
}*/