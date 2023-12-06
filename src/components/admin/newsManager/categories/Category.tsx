import { category } from "@/model/Category";
import React, { useState } from "react";

import CategoryMode from "./categoryMode";
import CategoryForm from "./CategoryForm";
import UpdateCategory from "./UpdateCategory";
import RenderCategory from "./RenderCategory";

export default function Category() {
    const [categoryToEdit, setCategoryToEdit] = useState<category>();
    const [categoryMode, setCategoryMode] = useState<CategoryMode>(CategoryMode.RENDER);

    function renderContent() {
        let categoryContent = <></>;

        switch (categoryMode) {
            case CategoryMode.RENDER:
                categoryContent = <RenderCategory setCategoryMode={setCategoryMode} setCategoryToEdit={setCategoryToEdit} />
                break;

            case CategoryMode.CREATE:
                categoryContent = <CategoryForm setCategoryMode={setCategoryMode} isInCreateMode />
                break;

            case CategoryMode.EDIT:
                categoryContent = <UpdateCategory categoryToEdit={categoryToEdit} setCategoryMode={setCategoryMode} />
                break;
        }

        return categoryContent;
    }

    return (
        <section className="flex-column-center">
            <div className="flex-row-center margin-y">
                <button className="button-save" onClick={e => categoryMode === CategoryMode.RENDER ? setCategoryMode(CategoryMode.CREATE) : setCategoryMode(CategoryMode.RENDER)}>
                    {categoryMode === CategoryMode.RENDER ? "Criar nova" : "Voltar"}
                </button>
            </div>
            <div className="flex-column-center">
                {renderContent()}
            </div>
        </section>
    )
}