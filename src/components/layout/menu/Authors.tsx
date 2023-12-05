import { useState, useEffect } from "react";

// import "./authors.scss";
import Request from "@/model/Request";

export default function Authors() {
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
        Request.get("/users/newsAuthors")
            .then(resp => setAuthors(resp));
    }, [])

    function renderNewsAuthor() {
        return authors.map(author => {
            return (
                <li key={`news-author-${author.name}`}>
                    <a className="clean-link" href={`/authors?param=id&value=${author.id}`} title={`Ver noticias feitas por ${author.name}`}>
                        {author.name}
                    </a>
                </li>
            )
        })
    }

    return <ul className="flex-row-around list flex-wrap">{renderNewsAuthor()}</ul>
}