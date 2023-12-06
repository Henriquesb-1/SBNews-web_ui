import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Request from '@/model/Request';

import styles from "./newsForm.module.scss";
import { category } from '@/model/Category';
import { News } from '@/model/News';
import Mode from './mode';
import FeedBack from '@/utils/FeedBack';
import FileUpload from '@/utils/FileUpload';
import useAuthContext from '@/contextApi/hook/useAuthContext';

interface NewsFormProps {
    isInCreateMode?: boolean;
    newsToEdit?: News;
    setMode: Dispatch<SetStateAction<Mode>>;
}

export default function NewsForm({ isInCreateMode, newsToEdit, setMode }: NewsFormProps) {
    const { user } = useAuthContext();

    const [categories, setCategories] = useState<category[]>([]);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [newsCover, setNewsCover] = useState<any>();
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        Request.get("/category?withoutPagination=true")
            .then(resp => setCategories(resp));
    }, []);

    useEffect(() => {
        if (newsToEdit) {
            setTitle(newsToEdit.title);
            setDescription(newsToEdit.description);
            setCategory(newsToEdit.categoryId + "" || "1");
            setContent(newsToEdit.content);
        }
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

    function handleSubmit(e: any, isVisible = true) {
        e.preventDefault();

        if (isInCreateMode) {
            const date = new Date();
            const dateCreated = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const imageUrl = newsCover ? `http://localhost:3001/news/cover/${newsCover.name}` : "http://localhost:3001/news/cover/default.jpeg";


            Request.post("/news", { title, description, category: { id: category }, author: { id: user?.id }, imageUrl, content, dateCreated, isVisible }, localStorage.getItem("at") || "")
                .then(resp => {
                    if (newsCover) FileUpload.upload(newsCover.file, "news-cover", newsCover.name, "/news/upload");
                    FeedBack.success(isVisible ? "Notícia criada com sucesso" : "Notícia salva com sucesso");
                    setMode(Mode.RENDER);
                })
                .catch(err => FeedBack.error("Erro ao criar notícia"));
        } else {
            const imageUrl = newsCover ? `http://localhost:3001/news/cover/${newsCover.name}` : newsToEdit?.imageUrl;

            Request.put("/news", { id: newsToEdit?.id, title, description, category: { id: category }, author: { id: user?.id }, imageUrl, content, isVisible }, localStorage.getItem("at") || "")
                .then(resp => {
                    if (newsCover) FileUpload.upload(newsCover.file, "news-cover", newsCover.name, "/news/upload");
                    FeedBack.success("Notícia atualizada com sucesso");
                    setMode(Mode.EDIT);
                })
                .catch(err => FeedBack.error("Erro ao atualizar notícia"));
        }
    }

    return (
        <form className="full-width flex-column-center" action="">
            <div className="margin-y text-center">
                <div>
                    <label htmlFor="title">Titulo</label>
                </div>

                <div>
                    <input className="input" type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
            </div>

            <div className="margin-y text-center">
                <div>
                    <label htmlFor="description">Descrição</label>
                </div>

                <div>
                    <input className="input" type="text" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
            </div>

            <div className="margin-y text-center">
                <div>
                    <label htmlFor="category">Categoria</label>
                </div>

                <div>
                    <select className="input" id="category" name="category" value={category} onChange={e => setCategory(e.target.value)}>
                        {renderCategories()}
                    </select>
                </div>
            </div>

            <div className="margin-y text-center">
                <div>
                    <label htmlFor="cover">Imagem</label>
                </div>

                <div>
                    <input type="file" name="cover" id="cover" onChange={e => FileUpload.prepareImageToUpload(e.target, "news-cover", setNewsCover)} />
                </div>
            </div>

            <div className={`${styles.editor} margin-y`}>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event: any, editor: any) => setContent(editor.getData())}
                />
            </div>

            <div className="flex-column-center">
                <div className="flex-row margin-y">
                    <div className="margin-x">
                        <button className="button-save" onClick={e => handleSubmit(e)}>Salvar como visivel</button>
                    </div>

                    <div className="margin-x">
                        <button className="button-save" onClick={e => handleSubmit(e, false)} title="Notícia não irá ficar visível">Salvar como não visível</button>
                    </div>

                    <div className="margin-x">
                        <button className="cancel-button" onClick={() => setMode(Mode.RENDER)}>Voltar</button>
                    </div>
                </div>
            </div>
        </form>
    )
}