import { useState } from "react";
import Modal from 'react-modal';
import closeImg from '../../assets/close.png';
import incomeImg from '../../assets/Entradas.png';
import outcomeImg from '../../assets/Saidas.png';
import { Container, RadioBox, TransactionTypeContainer } from "./styles.ts";

export function NewCompraModal({ isOpen,  onRequestClose})  {
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');


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
                />

                 <input
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    type='number'
                    placeholder="Valor"
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
                        <img src={outcomeImg} alt="Entrada" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Categoria"
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}