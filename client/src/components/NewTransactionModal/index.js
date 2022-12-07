import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import closeImg from '../../assets/close.png';
import incomeImg from '../../assets/Entradas.png';
import outcomeImg from '../../assets/Saidas.png';
import { tokenService } from "../../services/tokenService";
import { Container, RadioBox, TransactionTypeContainer } from "./styles.ts";

export function NewTransactionModal({ isOpen,  onRequestClose, transactions})  {
    const [type, setType] = useState('deposit');
    const [typeAdvanced, setTypeAdvanced] = useState("uniquepay");
    const [title, setTitle] = useState('');
    const [time, setTime] = useState("");
    const [qtdParcelas, setQtdParcelas] = useState();
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState('');
    const [subtitles, setSubtitles] = useState([]);
    const [currentDataAtual, setCurrentDataAtual] = useState([]);

    useEffect(() => {
        var listaSubtitles = [];
        transactions.map((transaction) => {
            if(listaSubtitles.indexOf(transaction.subtitle) >= 0){
            } else {
                if(listaSubtitles.length <= 15) {
                    listaSubtitles.push(transaction.subtitle)
                }
            }
        })
        
        let currentDate = new Date();

        let currentDia = currentDate.getDate();
        let currentMes = currentDate.getMonth() + 1;
        let currentAno = currentDate.getFullYear();

        if(currentDia < 10) {
            currentDia = "0"+currentDia;
        }

        if(currentMes < 10) {
            currentMes = "0"+currentMes;
        }

        if(currentMes >= 13) {
            currentMes = "1";
        }

        let dayFormatted = currentAno + "-" + currentMes + "-" + currentDia;

        setCurrentDataAtual(dayFormatted);
        setSubtitles(listaSubtitles);
    }, [isOpen])


    async function handleCadastrar(e) {
        e.preventDefault();
        const token = tokenService.get();
        // const res = await axios({method: "get", url: "http://localhost:5000/api/action/getParcelas", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
        // setParceladas(res.data);
        if(type==="withdraw" && typeAdvanced==="installment") {
            // name, subtitle, value, numero, time
            const res = await axios.post("http://localhost:5000/api/action/addParcela", {name: title, subtitle: category, value: amount, numero: qtdParcelas, time: currentDataAtual}, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
            console.log(res.data);
            // console.log(title, category, amount, qtdParcelas,  currentDataAtual)
        } else if(type==="withdraw") {
            // name, subtitle, value, time, state
            const res = await axios.post("http://localhost:5000/api/action/addTransaction", {name: title, subtitle: category, value: amount, time: currentDataAtual, state: "PAGO"}, {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
            console.log(res.data);
            // console.log(amount, category, title, currentDataAtual);
        } else {
            // name, subtitle, value, time, state
            const res = await axios.post("http://localhost:5000/api/action/addTransaction", {name: title, subtitle: category, value: amount, time: currentDataAtual ,state: "RECEBIDO"}, {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
            console.log(res.data);
            // console.log(title, category, amount, currentDataAtual, "RECEBIDO");
        }
    }

    function handleCategory(e, subtitle) {
        e.preventDefault();

        setCategory(subtitle)
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container >
                <button 
                    type='button' 
                    onClick={onRequestClose} 
                    className='react-modal-close'
                >
                    <img src={closeImg} alt="fechar modal" />
                </button>

                <h1>Cadastrar transação</h1>
                
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    placeholder="Título"
                    required
                />

                <input
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    type='number'
                    placeholder="Valor da compra"
                    required
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>
                {type==="withdraw"?
                    <>
                        
                        <TransactionTypeContainer>
                            <RadioBox
                                type="button"
                                onClick={() => { setTypeAdvanced('uniquepay'); }}
                                isActive={typeAdvanced === 'uniquepay'}
                                activeColor="green"
                            >
                                <span>Pagamento Unico</span>
                            </RadioBox>

                            <RadioBox
                                type="button"
                                onClick={() => { setTypeAdvanced('installment'); }}
                                isActive={typeAdvanced === 'installment'}
                                activeColor="green"
                            >
                                <span>Parcelado</span>
                            </RadioBox>

                        </TransactionTypeContainer>

                    </>
                :
                    ""
                }

                {typeAdvanced==="installment" && type==="withdraw"?
                    <div>
                        <input
                        value={qtdParcelas}
                        onChange={(e) => setQtdParcelas(Number(e.target.value))}
                        type="number"
                        required
                        placeholder="Quantidade de Parcelas"
                        />   

                    </div>

                :
                ""}

                <input id="date" type="date" value={currentDataAtual} className="mt-5" onChange={(e) => setCurrentDataAtual(e.target.value)}></input>

                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Categoria"
                    required
                />

                <div className="text-center m-5">
                    <p>Ou selecione alguma ja registrada</p>
                </div>

                <div className="flex flex-wrap justify-center">
                    {subtitles?.map((subtitle) => {
                        return(
                            <button onClick={(e) => handleCategory(e, subtitle)} className="border p-3 m-0.5 border-gray-300 rounded-lg text-center max-w-fit">
                                <p>{subtitle}</p>
                            </button>
                            
                        )
                    })}
                </div>

                <button type="submit" onClick={(e) => handleCadastrar(e)}>
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}