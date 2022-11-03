import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import logoImg from '../../assets/logo.png';
import { logout } from "../../redux/userSlice";
import { tokenService } from "../../services/tokenService";
import { Container, Content } from './styles.ts';

export function Header({onOpenNewTransactionModal, type}) {
    const dispatch = useDispatch();

    const {currentUser} = useSelector((state) => state.user);

    function deslogar(e) {
        e.preventDefault();
        dispatch(logout());
        tokenService.delete();
        window.location.reload();
    }

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
                {type!=="signin"?
                    <button onClick={(e) => deslogar(e)}><MdOutlineLogout size="25"/>{currentUser.name}</button>
                :
                    ""            
                }
            </Content>
        </Container>
    );
}