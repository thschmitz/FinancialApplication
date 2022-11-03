import { useState } from "react";
import { useSelector } from "react-redux";
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from "./components/NewTransactionModal";
import { SignIn } from "./components/SignIn";
import { GlobalStyle } from './styles/global.ts';

export default function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false); 
    
  function handleOpenIsTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseIsTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  const {currentUser} = useSelector((state) => state.user);

  console.log(currentUser)

  return (
    <>
      {currentUser?
        <>
          <Header onOpenNewTransactionModal={handleOpenIsTransactionModal}/>
          <Dashboard/>
          <NewTransactionModal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseIsTransactionModal}
          />
          <GlobalStyle/>
        </>
      :
        <>
          <SignIn/>
          <GlobalStyle/>
        </>
      }

    </>
    
  )
}


