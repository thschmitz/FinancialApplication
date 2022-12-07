import axios from 'axios';
import React, { useEffect, useState } from "react";
import { tokenService } from "../../services/tokenService";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionsTable";
import { Container } from "./styles.ts";

export function Dashboard({handleOpenIsSingleModalOpen, isNewSingleModalOpen}) {

    // In this component i need to add the tabs to make the choice to which component i wanna see
    const [transactions, setTransactions] = useState();
    const [parceladas, setParceladas] = useState();

    useEffect(()=> {
        const token = tokenService.get();
        try{
            
            const funcaoTransactionsPagas = async() => {
                const res = await axios({method: "get", url: "http://localhost:5000/api/action/getTransaction", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});
                setTransactions(res.data);
            }

            const funcaoTransactionsParceladas = async() => {
                const res = await axios({method: "get", url: "http://localhost:5000/api/action/getParcelas", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
                setParceladas(res.data);
            }

            funcaoTransactionsPagas();
            funcaoTransactionsParceladas();

        } catch(err) {
            console.log(err);
        }
    }, [])

    return (
        <Container>
            <Summary transactions={transactions}/>
            <TransactionTable handleOpenIsSingleModalOpen={handleOpenIsSingleModalOpen} transactions={transactions} setTransactions={setTransactions} parceladas={parceladas} setParceladas={setParceladas} isNewSingleModalOpen={isNewSingleModalOpen}/>
        </Container>
    )
}