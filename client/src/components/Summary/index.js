import { Container } from "./styles.ts";

import iconmeImg from '../../assets/Entradas.png';
import outcomeImg from '../../assets/Saidas.png';
import totalImg from '../../assets/Total.png';


export function Summary() {

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
                    }).format("0")}  
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
                    }).format("0")}
                </strong>
            </div> 

            <div style={{background: 'var(--green)', color: 'var(--shape)'}}>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format("0")}
                </strong>
            </div> 
        </Container>
    );
}