"use client";

import getUserLogged from "@/utils/GetUserLogged";
import { useState, useEffect } from "react";

import SiteAdmin from "./siteAdmin/SiteAdmin";
import NewsManager from "./newsManager/NewsManager";

import styles from "./admin.module.scss"
import UserType from "@/model/UserType";

interface AdminProps {
    path: string;
    page: string;
}

export default function Admin({ path, page }: AdminProps) {
    const [userType, setUserType] = useState<UserType>(UserType.NORMAL);

    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true);

    const activeColor = "#222"

    useEffect(() => {
        getUserLogged()
            .then(resp => {
                if(resp.userType === UserType.NORMAL) window.location.replace("/");
                else setUserType(resp.userType);
            });
    }, []);

    function renderAdminContent() {
        let adminContent = <></>

        switch (userType) {
            case UserType.ADMIN:
                adminContent = <SiteAdmin path={path} page={page} />
            break;

            case UserType.NEWS_MANAGER:
                adminContent = <NewsManager path={path} page={page} />
            break;
        }

        return adminContent;
    }

    function renderAdminMenu() {
        if (userType === UserType.ADMIN) {
            return (
                <>
                    <div className={styles.adminPageLink} style={{ backgroundColor: path == "dashboard" ? `${activeColor}` : "" }}>
                        <h2>
                            <a className="clean-link" href="/admin/dashboard">Dashboard</a>
                        </h2>
                    </div>
                    <div className={styles.adminPageLink} style={{ backgroundColor: path == "users" ? `${activeColor}` : "" }}>
                        <h2>
                            <a className="clean-link" href="/admin/users">
                                Usuários
                            </a>
                        </h2>
                    </div>
                    <div className={styles.adminPageLink} style={{ backgroundColor: path == "config" ? `${activeColor}` : "" }}>
                        <h2>
                            <a className="clean-link" href="/admin/config">
                                Ajustes
                            </a>
                        </h2>
                    </div>
                </>
            )
        } else if (userType === UserType.NEWS_MANAGER) {
            return (
                <>
                    <div className={styles.adminPageLink} style={{ backgroundColor: path == "dashboard" ? `${activeColor}` : "" }}>
                        <h2>
                            <a className="clean-link" href="/admin/dashboard">Dashboard</a>
                        </h2>
                    </div>
                    <div className={styles.adminPageLink} style={{ backgroundColor: path == "categories" ? `${activeColor}` : "" }}>
                        <h2>
                            <a className="clean-link" href="/admin/categories">
                                Categorias
                            </a>
                        </h2>
                    </div>
                    <div className={styles.adminPageLink} style={{ backgroundColor: path == "news" ? `${activeColor}` : "" }}>
                        <h2>
                            <a className="clean-link" href="/admin/news">
                                Notícias
                            </a>
                        </h2>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className={styles.menuHandler}>
                <button className="clean-button" onClick={() => setIsMenuVisible(!isMenuVisible)} title={isMenuVisible ? "Esconder menu" : "Ver menu"} style={{ transform: isMenuVisible ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                    <svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 223.413 223.413">
                    <g>
                        <g>
                            <g>
                                <polygon style={{fill: "#fff"}} points="57.179,223.413 51.224,217.276 159.925,111.71 51.224,6.127 57.179,0 172.189,111.71 			"/>
                            </g>
                        </g>
                    </g>
                </svg></button>
            </div>

            <div className={`flex-row ${styles.admin}`}>
                <div className={styles.adminMenu} style={{ left: isMenuVisible ? "0%" : "-100%", zIndex: isMenuVisible ? "10" : "0" }}>
                    {renderAdminMenu()}
                </div>

                <div className="admin-content full-width">
                    {renderAdminContent()}
                </div>
            </div>
        </>
    )
}