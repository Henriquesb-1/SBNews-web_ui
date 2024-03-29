import { useEffect, useState } from "react";
import styles from "./notificationsUnread.module.scss"
import Request from "@/model/Request";
import useAuthContext from "@/contextApi/hook/useAuthContext";
import Notification from "@/model/Notification";

export default function NotificationsUnread() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isUnreadNotificationVisible, setIsUnreadNotificationVisible] = useState<boolean>(false);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);

    const { user } = useAuthContext();

    useEffect(() => {
        const userToken = localStorage.getItem("at") || "";

        Request.get(`/users/auth`, userToken)
            .then(async resp => {
                const { data } = await Request.get(`/notification?name=${resp.name}`, userToken);
                const totalUnread = await Request.get(`/notification/unread/${resp.id}`, userToken);
                setNotifications(data);
                setUnreadNotificationsCount(totalUnread);
            });
    }, []);

    function renderNotifications() {
        if (notifications.length > 0) {
            return notifications.map((notification, index) => {
                return (
                    <div key={`notification-item-${index}`} className={styles.notification} style={{ backgroundColor: notification.hasBeenRead ? "#000" : "#353535" }}
                        onClick={e => setReadAndGoToNews(notification)}>
                        <p>{notification.content}</p>
                    </div>
                )
            })
        } else {
            return (
                <div>
                    <h4>Nenhuma notificação encontrada</h4>
                </div>
            )
        }
    }

    function setReadAndGoToNews(notification: Notification) {
        Request.put("/notification", notification, localStorage.getItem("at") || "")
            .then(resp => window.location.replace(`/read?p=title&v=${notification.newsOrigen.title}`))
    }

    return (
        <div className={styles.unreadNotifications}>
            <div className={styles.bell}>
                <button className="clean-button" onClick={e => setIsUnreadNotificationVisible(!isUnreadNotificationVisible)}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_15_159)">
                            <rect width="24" height="24" fill="none" />
                            <path d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19" stroke="#000000" strokeLinejoin="round" />
                            <path d="M12 5V3" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_15_159">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>

            {unreadNotificationsCount > 0 ? (
                <div className={styles.unreadNotificationsCount}>
                    <span>{unreadNotificationsCount}</span>
                </div>
            ) : false}

            <div className={styles.notifications} style={{ display: isUnreadNotificationVisible ? "block" : "none" }}>
                <div>
                    {renderNotifications()}
                </div>

                {notifications.length > 0 ? (
                    <div className="flex-row-center" onClick={e => window.location.replace(`/profile/notification/${user?.name}`)}>
                        <button className="button-save">
                            Ver todas
                        </button>
                    </div>
                ) : false}
            </div>
        </div>
    )
}