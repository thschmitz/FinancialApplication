import CachedIcon from '@mui/icons-material/Cached';
import { Jelly } from '@uiball/loaders';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, NavLink } from "react-router-dom";
import { tokenService } from "../../services/tokenService";
import { Container } from './styles.ts';

export function TransactionTable({handleOpenIsSingleModalOpen, transactions, setTransactions, parceladas, setParceladas, isNewSingleModalOpen}) {
    const token = tokenService.get();

    async function reload(e) {
        e.preventDefault();
        const token = tokenService.get();

        try{
            const res = await axios.get("http://localhost:5000/api/action/getTransaction", {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});

            const resParcelado = await axios.get("http://localhost:5000/api/action/getParcelas",{ headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}}); 

            setTransactions(res.data);
            setParceladas(resParcelado.data);
        } catch(err) {
            console.log(err);
        }

    }

    function dataFinalParcelada(parcela) {
        let data = parcela.days[parcela.days.length - 1]

        console.log("AAA:", data);
        let valoresDivididos = data.split("/");
        let valorFinal = valoresDivididos[1] + "/" + valoresDivididos[0] + "/" + valoresDivididos[2];

        return valorFinal;

    }

    if(!transactions || !parceladas) {
        return (
            <div className="flex w-full items-center justify-center p-20 text-xl">
                <Jelly size={50} color="#ff4501"/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Container>

                <h1 className="center">
                    <CachedIcon color="secondary" sx={{fontSize: 40}} onClick={(e) => reload(e)}/>

                </h1>

                <table>
                    <thead>
                        <tr>
                            <th className='Title'>Título</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {transactions?.map(transactions => {
                            return (
                                <tr key={transactions._id}>
                                    <td onClick={isNewSingleModalOpen}>{transactions.name}</td>
                                    <td className={transactions.type}>

                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(transactions.value)}
                                    </td> 
                                    <td>{transactions.subtitle}</td>
                                    <td>
                                        {transactions.time}
                                    </td>
                                    <td>
                                        {transactions.state === "RECEBIDO"?
                                        <p className="text-green-800">RECEBIDO</p>
                                        :
                                        <p className="text-red-800">{transactions.state}</p>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


                <table className="mt-10">
                    <thead>
                        <tr>
                            <th className='Title'>Título</th>
                            <th>Valor Parcela</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Qtd Parcelas</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {parceladas?.map(parcelada => {
                            return (
                                <tr key={parcelada._id}>
                                    <td onClick={isNewSingleModalOpen}>{parcelada.name}</td>
                                    <td className={parcelada.type}>

                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(parcelada.value)}
                                    </td> 
                                    <td>{parcelada.subtitle}</td>
                                    <td>
                                        {parcelada.time} - {dataFinalParcelada(parcelada)}
                                    </td>
                                    <td>
                                        {parcelada.numero}
                                    </td>
                                    <td>

                                        <p className="text-red-800">PARCELADO</p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </Container>
        </BrowserRouter>
        
    );
}