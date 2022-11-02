import { useState } from "react";
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from './styles/global.ts';

export default function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false); 
    
  function handleOpenIsTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseIsTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenIsTransactionModal}/>
      <Dashboard/>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseIsTransactionModal}
      />
      <GlobalStyle/>
    </>
  )
}


