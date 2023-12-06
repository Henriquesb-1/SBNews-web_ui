"use client";

import { useEffect, useState } from "react";
import Notification from "@/model/Notification";
import Request from "@/model/Request";

import styles from "./notifications.module.scss";
import FeedBack from "@/utils/FeedBack";

interface NotificationProps {
    userName: string;
}

enum Actions {
    MARK_AS_READ, DELETE, GO_TO_ORIGEN
}

export default function Notification({ userName }: NotificationProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [totalNotifications, setTotalNotifications] = useState<number>(0);
    const [isThereAnyUnread, setIsThereAnyUnread] = useState<boolean>(false);
    let [page, setPage] = useState<number>(1);

    useEffect(() => {
        const token = localStorage.getItem("at") || "";
        if (!token) window.location.replace("/");

        Request.get(`/notification?name=${userName}`, token)
            .then(resp => {
                const { data, total } = resp;

                for (let i = 0; i < data.length; i++) {
                    if(!data[i].hasBeenRead) {
                        setIsThereAnyUnread(true);
                        break;
                    }
                }

                setNotifications(data);
                setTotalNotifications(total);
            });
    }, []);

    function handleActions(actions: Actions, notification: Notification) {
        switch (actions) {
            case Actions.GO_TO_ORIGEN:
                window.open(`/read?p=title&v=${notification.newsOrigen.title}`)
                break;

            case Actions.DELETE:
                Request.delete(`/notification/${notification.id}`, localStorage.getItem("at") || "")
                    .then(resp => {
                        FeedBack.success("Notificação excluída");
                        setTotalNotifications(totalNotifications - 1);
                        setNotifications(notifications.filter(notificationOnScreen => notificationOnScreen.id !== notification.id));
                    })
                    .catch(err => FeedBack.error("Erro ao excluir notificação"));
                break;

            case Actions.MARK_AS_READ:
                Request.put(`/notification`, notification, localStorage.getItem("at") || "")
                    .then(resp => {
                        const setNotificationToRead = notifications.map(notificationsOnScreen => {
                            if (notificationsOnScreen.id === notification.id) notificationsOnScreen.hasBeenRead = true;
                            return notificationsOnScreen;
                        });

                        setNotifications(setNotificationToRead);
                    })
                    .catch(err => FeedBack.error("Erro ao marcar notificação como lida"));
                break;
        }
    }

    function setAllToRead() {
        const notificationsToSetRead = notifications.filter(notification => notification.hasBeenRead === false);

        Request.put(`/notification`, notificationsToSetRead, localStorage.getItem("at") || "")
            .then(resp => {
                const allNotificationsRead = notifications.map(notification => {
                    notificationsToSetRead.filter(notificationToSetToRead => notification.id === notificationToSetToRead.id ? notification.hasBeenRead = true : false);
                    return notification;
                });

                setNotifications(allNotificationsRead);
            })
            .catch(err => FeedBack.error("Erro ao marcar todas como lidas"));
    }

    function loadMoreNotifications() {
        setPage(++page);

        Request.get(`/notification?name=${userName}&page=${page}`, localStorage.getItem("at") || "")
            .then(resp => {
                for (let i = 0; i < resp.data.length; i++) {
                    if(!resp.data[i].hasBeenRead) {
                        setIsThereAnyUnread(true);
                        break;
                    }
                }
                setNotifications(notifications.concat(resp.data))
            })
            .catch(err => FeedBack.error("Erro ao carregar mais notificações"));
    }

    function renderNotification() {
        if (notifications.length > 0) {
            return notifications.map((notification, index) => {
                return (
                    <tr key={`notification-item-${notification.id}`} style={{ backgroundColor: notification.hasBeenRead ? "" : "#555" }} onDoubleClick={e => handleActions(Actions.GO_TO_ORIGEN, notification)}>
                        <td>{notification.content}</td>
                        <td>{notification.causedBy.name}</td>
                        <td>{notification.hasBeenRead ? "Sim" : "Não"}</td>
                        <td className="flex-row">
                            {!notification.hasBeenRead ? (
                                <div>
                                    <button className="clean-button" title="Marcar como lida" onClick={e => handleActions(Actions.MARK_AS_READ, notification)}>
                                        <span>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#0f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            ) : false}

                            <div>
                                <button className="clean-button" title="Excluir notificação" onClick={e => handleActions(Actions.DELETE, notification)}>
                                    <span>
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#f00" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan={4}>Nenhuma notificação para mostrar</td>
                </tr>
            )
        }
    }

    return (
        <div className={styles.notifications}>
            <div className="full-width margin-y">
                <table className="full-width">
                    <thead>
                        <tr className="margin-y">
                            <th>Conteudo</th>
                            <th>Causada por</th>
                            <th>Já foi acessada</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderNotification()}
                    </tbody>
                </table>
            </div>

            {isThereAnyUnread ? (
                <div className="flex-row-center margin-y">
                    <button onClick={e => setAllToRead()} className="button-save">Marcar todas como lida</button>
                </div>
            ) : false}

            {notifications.length < totalNotifications ? (
                <div className="flex-row-center margin-y">
                    <button onClick={e => loadMoreNotifications()} className="button-save">Carregar mais</button>
                </div>
            ) : false}
        </div>
    )
}