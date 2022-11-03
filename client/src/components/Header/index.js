import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import logoImg from '../../assets/logo.png';
import { logout } from "../../redux/userSlice";
import { Container, Content } from './styles.ts';

export function Header({onOpenNewTransactionModal, type}) {
    const dispatch = useDispatch();
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
                {type!=="signin"?
                    <button onClick={dispatch(logout())}><MdOutlineLogout size="25"/></button>
                :
                    ""            
                }
            </Content>
        </Container>
    );
}