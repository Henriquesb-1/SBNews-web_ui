"use client";

import useAuthContext from "@/contextApi/hook/useAuthContext";
import { useState } from "react";

import styles from "./auth.module.scss";

export default function SignIn() {
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { logIn } = useAuthContext();

    const submit = (event: any) => {
        event.preventDefault();
        logIn(name, password);
    }

    return (
        <>
            <div className="sign-title">
                <h1>Entrar</h1>
            </div>

            <form className={`${styles.authForm} flex-column-center`} method="POST">
                <div className={`${styles.authInput}`}>
                    <div>
                        <label htmlFor="name">Nome de usuario:</label>
                    </div>

                    <div className="flex-row-center">
                        <input type="text" name="name" className="input"
                            id="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                </div>

                <div className={styles.authInput}>
                    <div>
                        <label htmlFor="user-password">Senha:</label>
                    </div>

                    <div className="flex-row-center">
                        <input type="password" name="password"  className="input" id="user-password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className="auth-input">
                    <button type="submit" className="button-save" onClick={(event) => submit(event)}> Entrar </button>
                </div>

                <div className={`${styles.changeMode} ${styles.authInput} `}>
                    <a className="clean-link" href="/auth/signUp"> Não tem uma conta? Cadastre-se aqui </a>
                </div>
            </form>
        </>
    )
}