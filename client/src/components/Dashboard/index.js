import { useSelector } from "react-redux";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionsTable";
import { Container } from "./styles.ts";

export function Dashboard() {
    const {currentUser} = useSelector((state) => state.user);

    // In this component i need to add the tabs to make the choice to which component i wanna see
    return (
        <Container>
            <Summary />
            <TransactionTable />
        </Container>
    )
}