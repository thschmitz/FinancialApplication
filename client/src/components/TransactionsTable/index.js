import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tokenService } from "../../services/tokenService";
import { Container } from './styles.ts';

export function TransactionTable({handleOpenIsSingleModalOpen, transactions, setTransactions}) {
    const token = tokenService.get();

    async function reload(e) {
        e.preventDefault();
        const token = tokenService.get();

        try{
            const res = await axios({method: "get", url: "http://localhost:5000/api/action/getTransaction", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});

            setTransactions(res.data);
        } catch(err) {
            console.log(err);
        }

    }

    console.log("Transaction: ", transactions)

    return (
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
                                <td onClick={handleOpenIsSingleModalOpen}>{transactions.name}</td>
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
        </Container>
    );
}