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
            {categoryMode === CategoryMode.RENDER ? (
                <div>
                    <button className="button-save" onClick={e => setCategoryMode(CategoryMode.CREATE)}>Criar nova</button>
                </div>
            ) : false}
            <div className="flex-column-center">
                {renderContent()}
            </div>
        </section>
    )
}