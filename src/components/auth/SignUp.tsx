"use client";

import useAuthContext from "@/contextApi/hook/useAuthContext";
import { useState } from "react";

import styles from "./auth.module.scss"
import FileUpload from "@/utils/FileUpload";

export default function SignUp() {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profileImage, setProfileImage] = useState<any>();
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const { signUp } = useAuthContext();

    const submit = (event: any) => {
        event.preventDefault();
        signUp(userName, email, password, confirmPassword, profileImage);
    }

    return (
        <>
            <div className="sign-title">
                <h1>Crie sua conta</h1>
            </div>

            <form className={`${styles.authForm} flex-column-center`} method="POST">
                <div className={styles.authInput}>
                    <div>
                        <label htmlFor="user-name">Nome:</label>
                    </div>

                    <div>
                        <input placeholder={"Seu nome que será usado na plataforma"} type="text" name="userName"
                            id="user-name" value={userName} onChange={e => setUserName(e.target.value)} />
                    </div>
                </div>

                <div className={styles.authInput}>
                    <div>
                        <label htmlFor="user-email">Email:</label>
                    </div>

                    <div>
                        <input type="text" name="email" id="user-email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <span>
                        <i style={{ fontSize: ".7em" }}>
                            Usaremos esse e-mail para enviarmos o código de recuperação caso perca acesso a sua conta
                        </i>
                    </span>
                </div>

                <div className={styles.authInput}>
                    <div>
                        <label htmlFor="user-password">Senha:</label>
                    </div>

                    <div>
                        <input type="password" name="password" id="user-password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className={styles.authInput}>
                    <div>
                        <label htmlFor="user-email">Confirme sua senha:</label>
                    </div>

                    <div>
                        <input type="password" name="confirmPassword" id="user-confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </div>

                <div className={styles.authInput}>
                    <div>
                        <input type="file" name="image-url" id="user-img" onChange={e => FileUpload.prepareImageToUpload(e.target, "user-avatar", setProfileImage)} />
                    </div>
                    <div>
                        <span> <i>*Arquivos .jpg, .jpeg e .png*</i></span>
                    </div>
                </div>

                <div className={styles.authInput}>
                    <button className="button-save" onClick={(event) => submit(event)}>Cadastrar</button>
                </div>

                <div className={styles.authInput}>
                        <a className="clean-link" href="/auth/signIn"> Já possui uma conta? Acesse aqui </a>
                </div>
            </form>
        </>
    )
}