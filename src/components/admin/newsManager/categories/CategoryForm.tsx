import { category } from "@/model/Category";
import Request from "@/model/Request";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CategoryMode from "./categoryMode";
import FeedBack from "@/utils/FeedBack";
import useAuthContext from "@/contextApi/hook/useAuthContext";

interface CategoryFormProps {
    isInCreateMode?: boolean;
    categoryToEdit?: category;
    setCategoryMode: Dispatch<SetStateAction<CategoryMode>>;
}

export default function CategoryForm({ isInCreateMode, categoryToEdit, setCategoryMode }: CategoryFormProps) {
    const { user } = useAuthContext();

    const [name, setName] = useState<string>("");
    const [parentCategory, setParentCategory] = useState<string>("");

    const [categories, setCategories] = useState<category[]>([]);

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setParentCategory(categoryToEdit.parentCategory?.id + "");
        }
    }, []);

    useEffect(() => {
        // Request.get("/users/auth", localStorage.getItem("at") || "")
        //     .then(async resp => {
        //         const categories = await Request.get(`/category?withParent=true&userId=${resp.id}`);
        //         setCategories(categories);
        //     });

        Request.get("/category?withoutPagination=true")
            .then(resp => {
                setCategories(resp);
            });
    }, []);

    function renderCategories() {
        return categories.map(category => {
            return (
                <option value={category.id} key={`category-${category.id}`}>
                    {category.name}
                </option>
            )
        });
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        if (isInCreateMode) {
            Request.post("/category", { name, parentId: parentCategory, createdBy: user?.id }, localStorage.getItem("at") || "")
                .then(resp => FeedBack.success("Categoria criada"))
                .catch(err => FeedBack.error("Erro ao criar categoria"));
        } else {
            Request.put("/category", { id: categoryToEdit?.id, name, parentId: parentCategory }, localStorage.getItem("at") || "")
                .then(resp => FeedBack.success("Categoria alterada"))
                .catch(err => FeedBack.error("Erro ao alterar categoria"));
        }
    }

    function deleteCategory(e: any) {
        e.preventDefault();

        Request.delete(`/category/${categoryToEdit?.id}/${user?.id}`, localStorage.getItem("at") || "")
            .then(resp => {
                FeedBack.success("Categoria excluida");
                setCategoryMode(CategoryMode.RENDER)
            })
            .catch(err => FeedBack.warning(err.response.data));
    }

    return (
        <form className="full-width flex-column-center" action="">
            <div className="margin-y text-center">
                <div>
                    <label htmlFor="name">Nome</label>
                </div>

                <div>
                    <input className="input" type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
            </div>

            <div className="margin-y text-center">
                <div>
                    <label htmlFor="parent-category">Categoria Raiz</label>
                </div>

                <div>
                    <select className="input" id="parent-category" name="parent-category" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                        <option value="">--Categoria raiz--</option>
                        {renderCategories()}
                    </select>
                </div>
            </div>

            <div className="flex-column-center">
                <div className="flex-column-center margin-y">
                    <div className="flex-row">
                        <div className="margin-x">
                            <button className="button-save" onClick={e => handleSubmit(e)}>Salvar</button>
                        </div>

                        <div className="margin-x">
                            <button className="cancel-button" onClick={() => setCategoryMode(CategoryMode.RENDER)}>Excluir</button>
                        </div>
                    </div>

                    <div className="danger-zone margin-y">
                        <div className="margin-y flex-column-center">
                            <div className="margin-y">
                                <span>Atenção! Ao excluir uma categoria, as noticias ligadas a ela também serão excluidas</span>
                            </div>

                            <div>
                                <button className="delete-button" onClick={e => deleteCategory(e)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}