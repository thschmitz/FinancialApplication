import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Container } from './styles.ts';

export function TransactionTable() {

    const {currentUser} = useSelector((state) => state.user);

    async function reload(e) {
        e.preventDefault();

        try{
            const res = await axios({method: "get", url: "http://localhost:5000/api/action/getTransaction", headers: {"Content-Type": "application/json"}});

            console.log(res.data);
        } catch(err) {
            console.log(err);
        }

    }

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
                    
                    {/*transactions.map(transactions => {
                        return (
                            <tr key={transactions.id}>
                                <td>{transactions.title}</td>
                                <td className={transactions.type}>
                                    {transactions.type === 'withdraw' ? '- ' : ''}

                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transactions.amount)}
                                </td> 
                                <td>{transactions.category}</td>
                                <td>
                                     {new Intl.DateTimeFormat('pt-BR').format(
                                        new Date(transactions.createdAt)
                                     )}
                                </td>
                            </tr>
                        )
                    })*/}
                </tbody>
            </table>
        </Container>
    );
}