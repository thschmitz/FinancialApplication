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
            var parcelaCurrentDayCompareList = currentParcela.days[j].split("/");
            
            var parcelaCurrentDay = new Date(parcelaCurrentDayCompareList[2] + "/" + parcelaCurrentDayCompareList[1] + "/" + parcelaCurrentDayCompareList[0])

            if(currentDay.getTime() < parcelaCurrentDay.getTime()){
                novaListaParcelas.push(currentParcela.days[j]);

            } else if(currentDay.getTime() >= parcelaCurrentDay.getTime()){
                novaListaParcelasPagas.push(currentParcela.days[j]);

            }

        }

        await Parcelas.findByIdAndUpdate(currentParcela._id, {
            $set: {
                days: novaListaParcelas
            }
        }, {new: true})

        if(novaListaParcelasPagas.length > 0) {
            await Parcelas.findByIdAndUpdate(currentParcela._id, {
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

    var month = parseInt(partesTime[1]);
    var year = parseInt(partesTime[0]);
    var day = parseInt(partesTime[2]);

    console.log(year + 1, req.body.time)

    // dar uma olhada por causa do ano bissexto!
    for(let i = 0; i < req.body.numero; i++) {

        console.log(month)
        if(month > 12) {
            month = 1;
            year = year + 1;
        }

        var dataCompleta = day + "/" + month + "/" + year;
        lista.push(dataCompleta);
        month+=1;
    }



    var timeFinal = parseInt(partesTime[2]) + "/" + parseInt(partesTime[1]) + "/" + parseInt(partesTime[0]);

    console.log("TimeFinal: " + timeFinal);
    console.log(lista)

    const parcela = new Parcelas({name: req.body.name, subtitle: req.body.subtitle, value: req.body.value, days: lista, numero: req.body.numero, time: timeFinal, userID: req.user.id});

    try{
        await parcela.save();
        checkParcelas(req);
        res.status(200).send("Parcela has been created!");
    }catch(err) {
        next(createError(err));
    }
}