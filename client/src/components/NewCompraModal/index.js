import Modal from 'react-modal';
import closeImg from '../../assets/close.png';
import { Container } from "./styles.ts";

export function NewCompraModal({ isOpen,  onRequestClose, data})  {
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container >
                <div className="text-center">
                    <button 
                        type='button' 
                        onClick={onRequestClose} 
                        className='react-modal-close'
                    >
                        <img src={closeImg} alt="fechar modal" />
                    </button>

                    <div className="flex">
                        <h1 className="underline">{data?.name}</h1> 
                        {data?.state === "RECEBIDO"?
                            <p className="text-green-600">({data?.state})</p> 
                        :

                            <p className="text-red-600">({data?.state || "PARCELADO"})</p> 
                        }
                    </div>

                    <h1>Informacoes:</h1>
                    {data?.state === "PAGO"?
                        <p>Valor Pago: <b>{data?.value}</b></p>
                    :
                    data?.state === "RECEBIDO"?
                        <p>Valor Recebido: <b>{data?.value}</b></p>
                    :
                        <p>Valor Parcelado: <b>{data?.value}</b></p>
                    }

                    <p>Categoria: <b>{data?.subtitle}</b></p>

                    <p>Inserido no dia: <b>{data?.time}</b></p>
                    {data?.numero?
                    <div>
                        <p>Numero de parcelas: <b>{data?.numero}</b></p>
                        {data?.daysPassed?.length === 0? <p>Voce ainda nao pagou nenhuma parcela</p> : <p>Voce ja pagou <b>{data?.daysPassed?.length}</b> {data?.daysPassed?.length > 1? "parcelas" : "parcela"}</p>}
                        
                    </div>
                :
                    ""
                }
                    <button className="editar" type="submit">
                        Editar
                    </button>

                    <button className="deletar" type="submit">
                        Deletar
                    </button>
                </div>
            </Container>
        </Modal>
    );
}