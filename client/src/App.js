import { Jelly } from '@uiball/loaders';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewCompraModal } from "./components/NewCompraModal";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { SignIn } from "./components/SignIn";
import { tokenService } from "./services/tokenService";
import { GlobalStyle } from './styles/global.ts';

export default function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false); 
  
  const [isNewSingleModalOpen, setIsNewSingleModalOpen] = useState(false);

  function handleOpenIsTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseIsTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  function handleOpenIsSingleModalOpen() {
    setIsNewSingleModalOpen(true);
  }

  function handleCloseIsSingleModalOpen() {
    setIsNewSingleModalOpen(false);
  }

  const {currentUser} = useSelector((state) => state.user);
  const {loading} = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);

  const token = tokenService.get();

  useEffect(() => {
    try{
            
      const funcao = async() => {
          const res = await axios({method: "get", url: "http://localhost:5000/api/action/getTransaction", withCredentials: false, headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});
          setTransactions(res.data);
      }



      funcao();


  } catch(err) {
      console.log(err);
  }
  }, [])

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
          <Dashboard handleOpenIsSingleModalOpen={handleOpenIsSingleModalOpen}/>
          <NewTransactionModal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseIsTransactionModal}
            transactions={transactions}
          />
          <NewCompraModal
            isOpen={isNewSingleModalOpen}
            onRequestClose={handleCloseIsSingleModalOpen} />
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


