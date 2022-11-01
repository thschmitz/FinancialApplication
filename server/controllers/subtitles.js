import { createError } from "../error.js";
import Subtitle from "../models/Subtitle.js";


export const addSubtitle = async(req, res, next) => {
    const subtitle = new Subtitle({name: req.body.name, userID: req.user.id});
    
    try{
        await subtitle.save();
        res.status(200).send("Subtitle has been created!");
    } catch(err) {
        next(createError(err));
    }
}

export const getSubtitle = async(req, res, next) => {
    try{
        const subtitles = await Subtitle.find({userID: req.user.id})
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
}