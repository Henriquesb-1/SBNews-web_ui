import useAuthContext from "@/contextApi/hook/useAuthContext";
import { category } from "@/model/Category";
import Request from "@/model/Request";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CategoryBox from "./CategoryBox";

import CategoryMode from "./categoryMode";

import styles from "./renderCategory.module.scss";

interface RenderCategoryProps {
    setCategoryMode: Dispatch<SetStateAction<CategoryMode>>;
    setCategoryToEdit: Dispatch<SetStateAction<category | undefined>>;
}

export default function RenderCategory({ setCategoryMode, setCategoryToEdit }: RenderCategoryProps) {
    const { user } = useAuthContext();

    const [categories, setCategories] = useState<category[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("at") || "";

        if (user) {
            Request.get(`/category?withParent=true&userId=${user.id}`)
                .then(resp => {
                    setCategories(resp)
                })
        } else {
            Request.get("/users/auth", token)
                .then(async resp => {
                    const categories = await Request.get(`/category?withParent=true&userId=${resp.id}`);
                    setCategories(categories)
                })
        }
    }, []);

    function renderCategories() {
        if (categories.length > 0) {
            return categories.map((category, index) => {
                return <CategoryBox category={category} key={`category-list-${category.id}`} setCategoryToEdit={setCategoryToEdit} setCategoryMode={setCategoryMode} />
            });
        } else {
            return (
                <div>
                    <h2>Nenhuma categoria criada</h2>
                </div>
            )
        }
    }

    return (
        <section className="flex-column-center">
            <div className={`${styles.categories} flex-column-center`}>
                {renderCategories()}
            </div>
        </section>
    )
}