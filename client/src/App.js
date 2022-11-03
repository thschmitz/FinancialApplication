import { Jelly } from '@uiball/loaders';
import { useState } from "react";
import { useSelector } from "react-redux";
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from "./components/NewTransactionModal";
import { SignIn } from "./components/SignIn";
import { tokenService } from "./services/tokenService";
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
  const {loading} = useSelector((state) => state.user);

  const token = tokenService.get();

  console.log(currentUser)
  console.log("Loading: ", loading);
  
  if(loading)
  return(
      <div className="flex w-full items-center justify-center p-20 text-xl">
          <Jelly size={50} color="#ff4501"/>
      </div>
  )

  return (
    <>
      {currentUser && token?
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


