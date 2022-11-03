import { Button, Step, StepLabel, Stepper, TextField } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from "react";
import { Header } from "../Header";
import "./styles.css";

export function SignIn() {
    // In this component i need to add the tabs to make the choice to which component i wanna see
    const [etapaAtual, setEtapaAtual] = useState();

    function funcoes(){
        document.querySelector(`#nomeCriar`).value = "";
        document.querySelector(`#emailCriar`).value = "";
        document.querySelector(`#senhaCriar`).value = "";
    }


    function abreModalLogin(e){
        e.preventDefault();
        funcoes()
        document.querySelector(".modalCriarConta").style.display = "none";
        document.querySelector(".modalLoginConta").style.display = "block";
    }

    function voltar(e){
        e.preventDefault();
        document.querySelector(".modalCriarConta").style.display = "block";
        document.querySelector(".modalLoginConta").style.display = "none";
    }

    function logar(e) {
        e.preventDefault();

        const email = document.getElementById("emailLogin").value;
        const senha = document.getElementById("senhaLogin").value;


        console.log(email, senha);
    }


    return (
        <>

        <Header type="signin"/>

        <div className="telaUsuario">
            <form className="modalCriarConta">  
                <div className="titulo">
                    <h1>Formulario criar conta</h1>
                </div>
                <div className="formularioDados">
                    <TextField id="nomeCriar" label="Nome" type="nome" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                    required margin="normal" fullWidth variant="outlined"/>
                    <TextField id="emailCriar" label="Email" type="email" required margin="normal" fullWidth variant="outlined"/>
                    <TextField id="senhaCriar" label="Senha" type="password" required margin="normal" fullWidth variant="outlined"/>
                    <div className="botao">
                        <Button id="botaoCriar" type="submit" variant="contained" color="primary">Criar conta</Button>
                        <Button type="submit" variant="contained" onClick={(e)=>abreModalLogin(e)} color="primary">Ja tem uma conta?!</Button>
                    </div>
                    
                </div>
            </form>
            <form className="modalLoginConta"> 
                <div className="titulo">
                    <h1>Formulario login</h1>
                </div>
                    <div className="formularioDados">
                        <TextField id="emailLogin" label="Email" type="email" required margin="normal" fullWidth variant="outlined"/>
                        <TextField id="senhaLogin" label="Senha" type="password" required margin="normal" fullWidth variant="outlined"/>
                        <div className="botao">
                            <Button type="submit" onClick={(e)=>voltar(e)} variant="contained" color="primary">Voltar</Button>
                            <Button type="submit" variant="contained" onClick={(e) => logar(e)} color="primary">Login</Button>
                        </div>
                    </div>
            </form>
        </div>

        </>
    )
}