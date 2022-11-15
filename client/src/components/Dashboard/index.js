import axios from 'axios';
import React, { useEffect, useState } from "react";
import { tokenService } from "../../services/tokenService";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionsTable";
import { Container } from "./styles.ts";

export function Dashboard({handleOpenIsSingleModalOpen}) {

    // In this component i need to add the tabs to make the choice to which component i wanna see
    const [transactions, setTransactions] = useState();

    useEffect(()=> {
        const token = tokenService.get();
        try{
            
            const funcao = async() => {
                const res = await axios({method: "get", url: "http://localhost:5000/api/action/getTransaction", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});
                setTransactions(res.data);
            }

            funcao();

        } catch(err) {
            console.log(err);
        }
    }, [])

    return (
        <Container>
            <Summary transactions={transactions}/>
            <TransactionTable handleOpenIsSingleModalOpen={handleOpenIsSingleModalOpen} transactions={transactions} setTransactions={setTransactions}/>
        </Container>
    )
}