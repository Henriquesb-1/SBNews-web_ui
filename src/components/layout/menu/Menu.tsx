"use client";

import useMenuContext from "@/contextApi/hook/useMenuContext";
import Categories from "./Categories";

import styles from "./menu.module.scss";
import Authors from "./Authors";

export default function Menu() {
    const { showMenu } = useMenuContext();

    return (
        <aside className={styles.menu} style={{ top: showMenu ? "calc(0% + 70px)" : "-300%" }}>
            <div className={styles.menuItem}>
                <h2>Categorias</h2>
                <Categories />
            </div>

            <div className={styles.menuItem}>
                <h2>Autores</h2>
                <Authors />
            </div>
        </aside>
    )
}