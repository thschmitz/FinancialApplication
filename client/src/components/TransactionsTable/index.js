import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tokenService } from "../../services/tokenService";
import { Container } from './styles.ts';

export function TransactionTable() {

    const {currentUser} = useSelector((state) => state.user);
    const [transactions, setTransaction] = useState();
    const [reloads, setReloads] = useState(0);


    async function reload(e) {
        e.preventDefault();
        const token = tokenService.get();

        try{
            const res = await axios({method: "get", url: "http://localhost:5000/api/action/getTransaction", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});

            setTransaction(res.data);
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
                    </tr>
                </thead>

                <tbody>
                    
                    {transactions.map(transactions => {
                        return (
                            <tr key={transactions._id}>
                                <td>{transactions.name}</td>
                                <td className={transactions.type}>

                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transactions.value)}
                                </td> 
                                <td>{transactions.subtitle}</td>
                                <td>
                                     {new Intl.DateTimeFormat('pt-BR').format(
                                        new Date(transactions.createdAt)
                                     )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    );
}