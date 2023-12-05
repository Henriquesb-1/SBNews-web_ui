import { Dispatch, SetStateAction } from 'react';
import { category } from "@/model/Category";

import styles from "./categoryBox.module.scss";
import CategoryMode from './categoryMode';

interface CategoryBoxProps {
    category?: category;
    setCategoryMode: Dispatch<SetStateAction<CategoryMode>>;
    setCategoryToEdit: Dispatch<SetStateAction<category | undefined>>;
}

export default function CategoryBox({ category, setCategoryMode, setCategoryToEdit }: CategoryBoxProps) {

    return (
        <div className={`${styles.categoryBox} margin flex-column-between`}>
            <div>
                <h2>{category?.name}</h2>
            </div>

            {category?.parentCategory ? (
                <div>
                    <p>Categoria raiz: {category.parentCategory.name}</p>
                </div>
            ) : false}

            <div>
                <span>Noticias: {category?.newsCount}</span>
            </div>

            <div>
                <button className="button-save" onClick={e => {
                    if(setCategoryToEdit) setCategoryToEdit(category);
                    setCategoryMode(CategoryMode.EDIT);
                }}>Editar</button>
            </div>
        </div>
    )
}