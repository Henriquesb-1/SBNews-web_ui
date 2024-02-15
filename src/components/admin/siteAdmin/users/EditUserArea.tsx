import { useState, useEffect, Dispatch, SetStateAction } from "react";
import User from "@/model/User";

import styles from "./editUserArea.module.scss";
import Request from "@/model/Request";
import FeedBack from "@/utils/FeedBack";
import AdminConfig from "@/model/AdminConfig";
import AlertBox from "../Dashboard/AlertBox";
import UserType from "@/model/UserType";

interface EditUserAreaProps {
    muted: string;
    banned: string;
    userToEdit: User;

    users: User[];
    setUsers: Dispatch<SetStateAction<User[]>>;
}

const now = Math.floor(Date.now() / 1000);

export default function EditUserArea({ muted, banned, userToEdit, users, setUsers }: EditUserAreaProps) {
    const [userType, setUserType] = useState<UserType>(UserType.NORMAL);
    const [mutedDays, setMutedDays] = useState<number>(0);
    const [isBanned, setIsBanned] = useState<boolean>(false);
    const [alertBoxProps, setAlertBoxProps] = useState<{ isOpen: boolean, open: string }>({ isOpen: false, open: "" });

    const [adminConfig, setAdminConfig] = useState<AdminConfig>({ timesCanBeWarned: 5, defaultSilencedDays: 7, timesCanBeSilenced: 5, lastChangeBy: "" });

    useEffect(() => {
        const userToken = localStorage.getItem("at") || "";

        Request.get("/admin/config", userToken)
            .then(resp => setAdminConfig(resp));

        setUserType(userToEdit.userType);
    }, []);

    function handleSubmit(skipChecks: boolean = false) {
        const warnedTimes = userToEdit.warnedTimes || 0;
        const timesSilenced = userToEdit.timesSilenced || 0;
        const mutedTime = mutedDays > 0 ? now + 60 * 60 * 24 * mutedDays : 0;

        if (warnedTimes >= adminConfig.timesCanBeWarned && !skipChecks) {
            setAlertBoxProps({ isOpen: true, open: "advertTimesAlert" });
        } else if (timesSilenced >= adminConfig.timesCanBeSilenced && !skipChecks) {
            setAlertBoxProps({ isOpen: true, open: "silencedTimesAlert" });
        } else {
            setAlertBoxProps({ isOpen: false, open: "" });

            Request.put("/users", { userType, mutedTime, warnedTimes, timesSilenced, isBanned, id: userToEdit.id }, localStorage.getItem("at") || "")
                .then(resp => {
                    setUsers(users.filter(user => user.id != userToEdit.id));
                    FeedBack.success("Operação realizada com sucesso");
                })
                .catch(resp => FeedBack.error("Ocorreu um erro ao realizar a operação"));
        }

    }

    function renderAlertBoxOrNot() {
        if (alertBoxProps.open === "advertTimesAlert") {
            return <AlertBox
                alert={`Usuario já foi advertido mais de ${adminConfig.timesCanBeWarned} vezes. Ao continuar, usuario será silenciado por ${adminConfig.defaultSilencedDays} dias`}
                handleAction={() => handleSubmit(true)}
                closeBox={() => setAlertBoxProps({ isOpen: false, open: "" })}
            />
        } else if (alertBoxProps.open === "silencedTimesAlert") {
            return <AlertBox
                alert={`Usuario já foi silenciado mais de ${adminConfig.timesCanBeSilenced}. Ao continuar, usuario terá sua conta banida`}
                handleAction={() => handleSubmit(true)}
                closeBox={() => setAlertBoxProps({ isOpen: false, open: "" })}
            />
        }
    }

    function renderEditionArea() {
        const { name } = userToEdit;

        return (
            <div className={styles.editUserArea}>
                <div>
                    <h3>Usuario selecionado: {name}</h3>
                </div>

                {!banned ? (
                    <div className={`${styles.inputArea}`}>
                        <div>
                            <label htmlFor="user-type">Tipo</label>
                        </div>

                        <div>
                            <select name="user-type" id="user-type" value={userType} onChange={e => setUserType(Number.parseInt(e.target.value))}>
                                <option value={UserType.NORMAL}>Normal</option>
                                <option value={UserType.ADMIN}>Administrador</option>
                                <option value={UserType.NEWS_MANAGER}>Editor de notícias</option>
                            </select>
                        </div>

                        <div>
                            <button onClick={() => handleSubmit()} className="button-save">Mudar</button>
                        </div>
                    </div>
                ) : false}

                <div className={`${styles.inputArea}`}>
                    {!muted && !banned ? (
                        <>
                            <div>
                                <h3>Silenciar usuário</h3>
                            </div>

                            <div>
                                <div>
                                    <input type="number" name="days-to-silence" placeholder="Tempo (em dias)" min={0} value={mutedDays} onChange={e => setMutedDays(Number.parseInt(e.target.value || "0"))} />
                                </div>
                            </div>

                            <div>
                                <button onClick={() => {
                                    const timesSilenced = userToEdit.timesSilenced || 0;
                                    userToEdit.timesSilenced = timesSilenced + 1;
                                    handleSubmit();
                                }} className="button-save">Silenciar</button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <button onClick={() => {
                                userToEdit.mutedTime = 0;
                                handleSubmit();
                            }} className="button-save">Remover silenciamento</button>
                        </div>
                    )}
                </div>

                {!banned ? (
                    <div className={`${styles.inputArea}`}>
                        <div>
                            <button onClick={() => {
                                setIsBanned(true);
                                handleSubmit();
                            }} className={`${styles.banButton} clean-button`}>Banir usuário</button>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.inputArea}`}>
                        <div>
                            <button onClick={() => {
                                setIsBanned(false);
                                handleSubmit();
                            }} className="button-save">Reativar Conta</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex-column-center">
            {renderEditionArea()}
            {/* {renderAlertBoxOrNot()} */}

            {alertBoxProps.isOpen ? <>{renderAlertBoxOrNot()}</> : false}
        </div>
    )
}