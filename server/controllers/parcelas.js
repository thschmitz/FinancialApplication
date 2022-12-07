import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import Parcelas from "../models/Parcelas.js";

export const getParcelas = async (req, res, next) => {

    checkParcelas(req);
    const parcelasResultado = await Parcelas.find({userID: req.user.id});

    res.status(200).json(parcelasResultado);
}

const checkParcelas = async(req) => {
    var parcelas = await Parcelas.find({userID: req.user.id});

    var currentDay = new Date();

    for(var i = 0; i < parcelas.length; i++) {
        var novaListaParcelas = [];
        var novaListaParcelasPagas = [];
        const currentParcela = parcelas[i];

        for(var j = 0; j < currentParcela.days.length; j++) {
            var parcelaCurrentDay = new Date(currentParcela.days[j]);
            if(currentDay < parcelaCurrentDay){
                var novaDate = new Date(parcelaCurrentDay)
                novaListaParcelas.push(novaDate.getMonth() + 1 + "/" + novaDate.getDate() + "/" + novaDate.getFullYear());

            } else if(currentDay >= parcelaCurrentDay){
                var novaDate = new Date(parcelaCurrentDay)
                novaListaParcelasPagas.push(novaDate.getMonth() + 1 + "/" + novaDate.getDate() + "/" + novaDate.getFullYear());

            }
        }

        console.log("teste: ", novaListaParcelas)


        const updatedDaysParcela = await Parcelas.findByIdAndUpdate(currentParcela._id, {
            $set: {
                days: novaListaParcelas
            }
        }, {new: true})

        if(novaListaParcelasPagas.length > 0) {
            const updatedDaysParcelaPaga = await Parcelas.findByIdAndUpdate(currentParcela._id, {
                $set: {
                    daysPassed: novaListaParcelasPagas
                }
            }, {new: true})
        }

        

        
    }

}

export const addParcela = async(req, res, next) => {

    const lista = [];
    var partesTime = req.body.time.split("-");

    var month = partesTime[1]
    var year = partesTime[0]
    var day = partesTime[2]

    console.log(day + "/" + month + "/" + year)

    // dar uma olhada por causa do ano bissexto!
    for(let i = 0; i < req.body.numero; i++) {


        if(month > 12) {
            month = 1;
            year+=1;
        }

        var dataCompleta = month + "/" + day + "/" + year;
        lista.push(dataCompleta);
        month+=1;
    }

    console.log("opa: " ,lista)

    var timeFinal = partesTime[2] + "/" + partesTime[1] + "/" + partesTime[0];

    const parcela = new Parcelas({name: req.body.name, subtitle: req.body.subtitle, value: req.body.value, days: lista, numero: req.body.numero, time: timeFinal, userID: req.user.id});

    try{
        await parcela.save();
        checkParcelas(req);
        res.status(200).send("Parcela has been created!");
    }catch(err) {
        next(createError(err));
    }
}