import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { category } from "@/model/Category";
import CategoryForm from "./CategoryForm";
import CategoryMode from './categoryMode';

interface UpdateCategoryProps {
    categoryToEdit?: category;
    setCategoryMode: Dispatch<SetStateAction<CategoryMode>>;
}

export default function UpdateCategory({ categoryToEdit, setCategoryMode }: UpdateCategoryProps) {
    return (
        <div>
            <section>
                <CategoryForm setCategoryMode={setCategoryMode} categoryToEdit={categoryToEdit} />
            </section>

            <div className="text-center">
                <a href={`/category?p=name&v=${categoryToEdit?.name}`} target="_blank" title={`Ver noticias cadastrada na categoria ${categoryToEdit?.name}`} className="clean-link">Ver notícias desta categoria</a>
            </div>
        </div>
    )
}