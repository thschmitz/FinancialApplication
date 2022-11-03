import { Button, Step, StepLabel, Stepper, TextField } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { Header } from "../Header";
import "./styles.css";

export function SignIn() {
    // In this component i need to add the tabs to make the choice to which component i wanna see
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

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

    async function logar(e) {
        e.preventDefault();

        dispatch(loginStart());

        console.log(email, password)

        try{
            const res = await axios({method: "post", url: "http://localhost:5000/api/auth/signin", withCredentials: false, data: {email: email, password: password}});

            console.log(res.data);

            dispatch(loginSuccess(res.data));
        } catch(err) {
            dispatch(loginFailure());
        }
        



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
                        <TextField id="emailLogin" label="Email" type="email" required margin="normal" fullWidth variant="outlined" onChange={e => setEmail(e.target.value)}/>
                        <TextField id="senhaLogin" label="Senha" type="password" required margin="normal" fullWidth variant="outlined" onChange={e => setPassword(e.target.value)}/>
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