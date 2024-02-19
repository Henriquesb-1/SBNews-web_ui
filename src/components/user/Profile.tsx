"use client";

import { useState, useEffect } from "react";

import useAuthContext from "@/contextApi/hook/useAuthContext";
import Request from "@/model/Request";
import User from "@/model/User";

import styles from "./profile.module.scss";
import FileUpload from "@/utils/FileUpload";
import FeedBack from "@/utils/FeedBack";

export default function Profile({ userName }: { userName: string }) {
    const [commentsAgree, setCommentsAgree] = useState<number>(0);
    const [answersAgree, setAnswersAgree] = useState<number>(0);

    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [oldAvatar, setOldAvatar] = useState<any>();
    const [profilePicture, setProfilePicture] = useState<any>();
    const [joinIn, setJoinIn] = useState<any>();
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isPerfilOwner, setIsPerfilOwner] = useState<boolean>(false);
    const [showUpdateProfileFields, setShowUpdateProfileFields] = useState<boolean>(false);

    function submit() {
        const avatar = profilePicture ? `${profilePicture.name}` : oldAvatar;
        const token = localStorage.getItem("at") || "";

        Request.post("/users/profile", { id, name, email, avatar, password, newPassword, confirmPassword }, token)
            .then(resp => {
                if (profilePicture) FileUpload.upload(profilePicture.file, "userImage", profilePicture.name, "/users/upload");

                FeedBack.success("Perfil alterado com sucesso");
                setTimeout(() => location.replace(`/profile/${name}`), 3000);
            })
            .catch(err => FeedBack.error(err.response.data));
    }

    useEffect(() => {
        const token = localStorage.getItem("at") || "";

        Request.get(`/users/profile?name=${userName}`)
            .then(resp => {
                const { id, name, email, avatar, joinIn } = resp.user;
                setId(id);
                setName(name);
                setEmail(email);
                setOldAvatar(avatar)
                setJoinIn(joinIn);

                setCommentsAgree(resp.commentsAgree)
                setAnswersAgree(resp.answersAgree);

                if (!token) setIsPerfilOwner(false);
                else {
                    Request.get("/users/auth", token)
                        .then(resp => resp.id === id ? setIsPerfilOwner(true) : false);
                }
            });
    }, []);

    return (
        <div className={styles.userProfile}>
            <div className={styles.userProfileCover}>
                <img src={oldAvatar} alt={`${name} cover photo`} />
            </div>

            <div className={styles.field}>
                {showUpdateProfileFields ? (
                    <div>
                        <label htmlFor="name">Nome</label>
                    </div>
                ) : false}
                <div>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} disabled={!isPerfilOwner} onClick={() => setShowUpdateProfileFields(true)} />
                </div>
            </div>

            {isPerfilOwner && showUpdateProfileFields ? (
                <>
                    <div className={styles.field}>
                        <div>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <div>
                            <label htmlFor="profile-picture">Imagem do perfil</label>
                        </div>

                        <div>
                            <input type="file" name="profile-picture" id="profile-picture" onChange={e => FileUpload.prepareImageToUpload(e.target, "user-avatar", setProfilePicture)} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <div>
                            <label htmlFor="password">Senha antiga</label>
                        </div>

                        <div>
                            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <div>
                            <label htmlFor="new-password">Nova senha(deixe em branco para não alterar)</label>
                        </div>

                        <div>
                            <input type="password" name="new-password" id="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                    </div>

                    {newPassword ? (
                        <div className={styles.field}>
                            <div>
                                <label htmlFor="new-password-repeat">Repita a nova senha</label>
                            </div>

                            <div>
                                <input type="password" name="new-password-repeat" id="new-password-repeat" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>
                    ) : false}

                    <div className={`flex-row ${styles.submitButtons}`}>
                        <div>
                            <button className="button-save" onClick={submit}>Salvar</button>
                        </div>

                        <div>
                            <button className="cancel-button" onClick={() => setShowUpdateProfileFields(false)}>Cancelar</button>
                        </div>
                    </div>
                </>
            ) : false}

            <div className={`${styles.info} flex-column-center`}>
                <span>Comentários que foram concordados: {commentsAgree}</span>
                <span>Comentários que foram discordados: {answersAgree}</span>
                <span>Entrou em {`${joinIn}`}</span>
            </div>
        </div>
    )
}