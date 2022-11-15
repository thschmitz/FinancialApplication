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

    useEffect(() => {

        var pago = 0;
        var recebido = 0;

        transactions?.map((data) => {
            console.log("valor: ", data.value)
            if(data.state==="PAGO" || data.state==="PENDENTE"){
                pago += data.value;
            } else {
                recebido += data.value;
            }
        })

        setSaidas(pago);
        setEntradas(recebido);
    }, [transactions])

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