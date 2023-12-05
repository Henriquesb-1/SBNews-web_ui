"use client";

import { useState, useEffect } from "react";
import User from "@/model/User";
import Request from "@/model/Request";
import Loading from "@/components/template/loading/loading";
import Error from "@/components/template/error/error";

import styles from "./renderUsers.module.scss";
import EditUserArea from "./EditUserArea";
import Paginator from "@/components/paginador/paginator";

interface RenderUsersProps {
    userType: string;
    muted: string;
    banned: string;
    page: string;
}

export default function RenderUsers({ userType, muted, banned, page }: RenderUsersProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [pages, setPages] = useState<number>(1);
    const [userToEdit, setUserToEdit] = useState<User>({ id: 0, name: "", imageUrl: "", isMuted: false, joinIn: "", userType: "" });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [showErrorScreen, setShowErrorScreen] = useState<boolean>(false);
    const [showEditionArea, setShowEditionArea] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setShowEditionArea(false);

        Request.get(`/users?type=${userType}&muted=${muted}&banned=${banned}&page=${page}`, localStorage.getItem("at") || "")
            .then(resp => {
                setUsers(resp.data);
                setPages(resp.pages);
            })
            .catch(err => setShowErrorScreen(true))
            .finally(() => setIsLoading(false));
    }, [userType, muted, banned]);

    function renderUsers() {
        return users.map((user, index) => {
            return (
                <tr key={`users-admin-${index}`} onClick={() => {
                    setUserToEdit(user);
                    setShowEditionArea(true);
                }}>
                    <td>{user.name}</td>
                    <td>{user.joinIn}</td>
                    <td>{user.warnedTimes}</td>
                    <td>{user.timesSilenced}</td>
                </tr>
            )
        })
    }

    function renderTable() {
        if (isLoading) return <Loading />
        else if(!isLoading && showErrorScreen) return <Error />
        else {
            return (
                <table className={styles.usersTable}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Entrou em</th>
                            <th>Vezes advertido</th>
                            <th>Vezes silenciado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderUsers()}
                    </tbody>
                </table>
            )
        }
    }

    return (
        <>
            {renderTable()}
            {showEditionArea ? <EditUserArea userToEdit={userToEdit} muted={muted} banned={banned} users={users} setUsers={setUsers} /> : false}
            <Paginator PageUrl="/admin/users?" currentPage={page} pages={pages} />
        </>
    )
}