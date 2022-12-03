import { Container } from "./styles.ts";

import axios from "axios";
import React, { useEffect, useState } from "react";
import iconmeImg from '../../assets/Entradas.png';
import outcomeImg from '../../assets/Saidas.png';
import totalImg from '../../assets/Total.png';
import { tokenService } from "../../services/tokenService";

export function Summary({transactions}) {
    const [transaction, setTransaction] = useState([]);
    const [saidas, setSaidas] = useState();
    const [entradas, setEntradas] = useState();
    const [parcelasPagas, setParcelasPagas] = useState(0)

    useEffect(() => {

        var pago = 0;
        var recebido = 0;

        transactions?.map((data) => {
            console.log("valor: ", data.value)
            if(data.state==="PAGO"){
                pago += data.value;
            } else {
                recebido += data.value;
            }
        })

        console.log("pago aqui hein: ", pago)
        setSaidas(parcelasPagas + pago);
        setEntradas(recebido);
    }, [transactions])

    useEffect(() => {
        const token = tokenService.get();
        const parcelas = async() => {
            const res = await axios({method: "get", url: "http://localhost:5000/api/action/getParcelas", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
            for(var i = 0; i < res.data.length; i ++) {
                console.log(res.data[i].value, res.data[i].daysPassed.length)
                setParcelasPagas(res.data[i].value * res.data[i].daysPassed.length);
            }
        }

        parcelas();

        console.log("parcelasPagas: ", parcelasPagas)
    }, [])

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={iconmeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(entradas)}  
                </strong>
            </div> 

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>- 
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(saidas)}
                </strong>
            </div> 

            <div style={{background: entradas - saidas >= 0? 'var(--green)' : 'var(--red)', color: 'var(--shape)'}}>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(entradas - saidas)}
                </strong>
            </div> 
        </Container>
    );
}