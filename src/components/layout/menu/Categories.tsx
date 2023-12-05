"use client";

import { useEffect, useState } from "react";

import Request from "@/model/Request";
import { category } from "@/model/Category";

import styles from "./categories.module.scss";

function CategoryItem({ id, name, children }: {id: number, name: string, children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div style={{ display: "flex" }} className={styles.treeMenu}>
            <div>
                <button className={`clean-button ${styles.itemHandler}`} onClick={() => setIsOpen(!isOpen)}>
                    <span className={styles.treeIcon}>
                        <svg style={{ transform: isOpen ? "rotateZ(180deg)" : "" }} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F" />
                        </svg>
                    </span>
                </button>
            </div>

            <li className={styles.menuItem} title={`Noticias sobre ${name}`}>
                <span>
                    <a className="clean-link" href={`/category?p=name&v=${name}`}>{name}</a>
                </span>

                <ul style={{ display: isOpen ? "block" : "none" }} className={styles.listMenu}>
                    {children}
                </ul>
            </li>
        </div>
    )
}

export default function Categories() {
    const [categories, setCategories] = useState<category[]>([]);

    useEffect(() => {
        Request.get("/category?withoutPagination=true")
            .then(resp => setCategories(resp))
    }, []);

    function renderMenuItens() {
        function renderChildren(categoryId: number) {
            return categories.map((menuItem, index) => {
                if (categoryId === menuItem.parentId) {
                    return (
                        <CategoryItem key={`category-item-${menuItem.name}`} id={menuItem.id} name={menuItem.name}>
                            {renderChildren(menuItem.id)}
                        </CategoryItem>
                    )
                }
            })
        };

        return categories.map((menuItem, index: number) => {
            if (menuItem.parentId === null) {
                return (
                    <ul key={`menu-item-${menuItem.name}`} className={styles.listMenu}>
                        <CategoryItem key={`category-item-${menuItem.name}`} id={menuItem.id}  name={menuItem.name} >
                            {renderChildren(menuItem.id)}
                        </CategoryItem>
                    </ul>
                )
            }
        });
    }

    return <div className={styles.categories} style={{ alignItems: "baseline" }} >{renderMenuItens()}</div>
}