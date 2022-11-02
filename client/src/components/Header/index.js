import logoImg from '../../assets/logo.png';
import { Container, Content } from './styles.ts';

export function Header({onOpenNewTransactionModal}) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    );
}