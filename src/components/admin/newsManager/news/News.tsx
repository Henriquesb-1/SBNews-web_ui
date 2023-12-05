import { useState } from "react"
import RenderNews from "./RenderNews";
import { News } from "@/model/News";

import styles from "./news.module.scss";
import Mode from './mode';
import EditNews from './EditNews';
import NewsForm from './NewsForm';

export default function News({ page }: { page: string }) {
    const [newsToEdit, setNewsToEdit] = useState<News>();
    const [mode, setMode] = useState<Mode>(Mode.RENDER);

    function renderContent(): React.ReactNode {
        let content: React.ReactNode = <></>;

        switch(mode) {
            case Mode.RENDER:
                content = <RenderNews page={page} onClick={news => setNewsToEdit(news)} setMode={setMode} />
            break;

            case Mode.EDIT:
                content = <EditNews newsToEdit={newsToEdit} setMode={setMode} />
            break;

            case Mode.CREATE:
                content = <NewsForm setMode={setMode} isInCreateMode />
            break;

            default:
                content = <RenderNews page={page} onClick={news => setNewsToEdit(news)} setMode={setMode} />
            break;
        }

        return content;
    }

    return (
        <section className={styles.newsSection}>
            <div className={styles.news}>
                {mode === Mode.RENDER ? (
                    <div className="flex-row-center">
                        <button className="button-save" onClick={() => setMode(Mode.CREATE)}>Criar notícia nova</button>
                    </div>
                ) : false}

                {renderContent()}
            </div>
        </section>
    )
}