import { News } from "@/model/News";

import styles from "./editNews.module.scss";
import NewsForm from "./NewsForm";
import { Dispatch, SetStateAction } from "react";
import Mode from "./mode";

interface EditNewsProps {
    newsToEdit?: News;
    setMode: Dispatch<SetStateAction<Mode>>;
}

export default function EditNews({ newsToEdit, setMode }: EditNewsProps) {
    return (
        <div className="full-width">
            <div className="margin-y text-center flex-row-center">
                <table className={styles.statsTable}>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Numero de visitas</th>
                            <th>Numero de comentários</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{newsToEdit?.id}</td>
                            <td>{newsToEdit?.visits}</td>
                            <td>{newsToEdit?.totalComments}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <NewsForm newsToEdit={newsToEdit} setMode={setMode} />

            {newsToEdit?.isVisible ? (
                <div className="flex-row-center">
                    <a href={`/read?p=title&v=${newsToEdit?.title}`} className="clean-link" title={newsToEdit?.title} target="_blank">Ver notícia publicada</a>
                </div>
            ) : false}
        </div>
    )
}