import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import Parcelas from "../models/Parcelas.js";

export const getParcelas = async(req, res, next) => {
    var parcelas = await Parcelas.find({userID: req.user.id});

    var currentDay = new Date();

    for(var i = 0; i < parcelas.length; i++) {
        var novaListaParcelas = [];
        const currentParcela = parcelas[i];

        for(var j = 0; j < currentParcela.days.length; j++) {
            var parcelaCurrentDay = new Date(currentParcela.days[j]);
            if(currentDay < parcelaCurrentDay){
                var novaDate = new Date(parcelaCurrentDay)
                novaListaParcelas.push(novaDate.getMonth() + 1 + "/" + novaDate.getDate() + "/" + novaDate.getFullYear());

            }
        }

        console.log("teste: ", novaListaParcelas)


        const updatedDaysParcela = await Parcelas.findByIdAndUpdate(currentParcela._id, {
            $set: {
                days: novaListaParcelas
            }
        }, {new: true})

        
    }

    const parcelasResultado = await Parcelas.find({userID: req.user.id});

    res.status(200).json(parcelasResultado);
}

export const addParcela = async(req, res, next) => {

    const lista = [];

    var actualDate = new Date(req.body.time);
    var month = actualDate.getMonth();
    var year = actualDate.getFullYear();

    // dar uma olhada por causa do ano bissexto!
    for(let i = 0; i < req.body.numero; i++) {

        month+=1;

        if(month > 12) {
            month = 1;
            year+=1;
        }

        var dataCompleta = month + "/" + actualDate.getDate() + "/" + year;
        lista.push(dataCompleta);
    }

    var partesTime = req.body.time.split("/");

    var timeFinal = partesTime[1] + "/" + partesTime[0] + "/" + partesTime[2];

    const parcela = new Parcelas({name: req.body.name, subtitle: req.body.subtitle, value: req.body.value, days: lista, numero: req.body.numero, time: timeFinal, userID: req.user.id});

    try{
        await parcela.save();
        res.status(200).send("Parcela has been created!");
    }catch(err) {
        next(createError(err));
    }
}