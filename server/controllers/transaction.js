import { createError } from "../error.js";
import Transaction from "../models/Transaction.js";


export const addTransaction = async(req, res, next) => {
    const transaction = new Transaction({name: req.body.name, value: req.body.value, qtd: req.body.qtd, time: req.body.time, userID: req.user.id});
    
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

export const updatedTransaction = async(req, res, next) => {
    try{
        await Transaction.findByIdAndUpdate(req.params.id);
        
        res.status(200).json("The transaction has been updated!");
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

/*export const getSubtitle = async(req, res, next) => {
    try{
        const subtitles = await Subtitle.find({userID: req.params.id})
        console.log("SubstitlesTest: ", subtitles)
        res.status(200).json(subtitles);
    } catch(err) {
        next(createError(err));
    }
}

export const updateSubtitle = async(req, res, next) => {
    try{

        const subtitle = await Subtitle.findById(req.params.id);
        if(!subtitle) return next(createError(404, "Subtitle not found!"));

        const updatedSubtitle = await Subtitle.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true})

        res.status(200).json(updatedSubtitle);
    }catch(err) {
        next(createError(err));
    }
}


export const deleteSubtitle = async(req, res, next) => {
    try{
        await Subtitle.findByIdAndDelete(req.params.id);

        res.status(200).json("The substitle has been deleted!");

    }catch(err){
        next(createError(err));
    }
}*/