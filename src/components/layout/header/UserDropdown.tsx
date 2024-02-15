"use client";

import Link from "next/link";

import { useState } from "react";
import useAuthContext from "@/contextApi/hook/useAuthContext";

import styles from "./userDropdown.module.scss";
import NotificationsUnread from "./NotificationsUnread";
import UserType from "@/model/UserType";

export default function UserDropDown() {
    const { user, logOut } = useAuthContext();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function renderUserDropdownOrLoginInvite() {
        const saveLastLocation = () => {
            localStorage.removeItem("last_location")
            localStorage.setItem("last_location", window.location.href)
        }

        if (user) {
            const canAccessAdminPage = user.userType === UserType.ADMIN || user.userType === UserType.NEWS_MANAGER;

            return (
                <div className="flex-row">
                    <div className={styles.linkWrapper}>
                        <div className="flex-row">
                            <div className={styles.userAvatar} onClick={() => setIsOpen(!isOpen)}>
                                <img className="user-avatar" src={user.imageUrl} alt="User avatar" />
                            </div>

                            <NotificationsUnread />
                        </div>

                        <div className={styles.menuItems} style={{ display: isOpen ? "block" : "none" }}>
                            <div className={styles.menuItem}>
                                <h3>{user.name}</h3>
                            </div>

                            {canAccessAdminPage ? (
                                <div className={styles.menuItem}>
                                    <Link href={`/admin/dashboard`} className="clean-link">
                                        Administração
                                    </Link>
                                </div>
                            ) : false}

                            <div className={styles.menuItem}>
                                <Link href={`/profile/${user.name}`} className="clean-link">
                                    Perfil
                                </Link>
                            </div>

                            <div className={styles.menuItem}>
                                <Link href="" className="clean-link" onClick={e => {
                                    e.preventDefault();
                                    logOut();
                                }}>
                                    Sair
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex-column-center">
                    <div className={styles.authLink}>
                        <h3>
                            <a href="/auth/signIn" onClick={() => saveLastLocation()} className="clean-link">Entrar</a>
                        </h3>
                    </div>
                    <div className={styles.authLink}>
                        <h3>
                            <a href="/auth/signUp" onClick={() => saveLastLocation()} className="clean-link">Criar conta</a>
                        </h3>
                    </div>
                </div>
            )
        }
    }

    return <>{renderUserDropdownOrLoginInvite()}</>
}