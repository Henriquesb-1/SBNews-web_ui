import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import useAuthContext from "@/contextApi/hook/useAuthContext";
import { News } from "@/model/News";
import Request from "@/model/Request";

import styles from "./renderNews.module.scss";
import Paginator from "@/components/paginador/paginator";
import Mode from "./mode";

interface RenderNewsProps {
    page: string
    onClick: (news: News) => void;
    setMode: Dispatch<SetStateAction<Mode>>;
}

export default function RenderNews({ page, onClick, setMode }: RenderNewsProps) {
    const [news, setNews] = useState<News[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const [isOnlyVisibleFilterChecked, setIsOnlyVisibleFilterChecked] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { user } = useAuthContext();

    useEffect(() => {
        // const authorId = await Request.get("/users/auth");
        const token = localStorage.getItem("at") || "";
        const url = isOnlyVisibleFilterChecked
            ? `/news?filter=titleAndAuthor&authorId=${user?.id}&page=${page}`
            : `/news/hidden?titleAndAuthor&authorId=${user?.id}&page=${page}`;

        if (user) {
            Request.get(url, token)
                .then(resp => {
                    setTotal(resp.total);
                    setNews(resp.data);
                    setPages(resp.pages);
                })
                .finally(() => setIsLoading(false));
        } else {
            Request.get("/users/auth", token)
                .then(async resp => {
                    const url = isOnlyVisibleFilterChecked
                        ? `/news?filter=titleAndAuthor&authorId=${resp.id}&page=${page}`
                        : `/news/hidden?titleAndAuthor&authorId=${resp.id}&page=${page}`;

                    const { data, pages, total } = await Request.get(url, token);

                    setNews(data);
                    setPages(pages);
                    setTotal(total);
                })
                .finally(() => setIsLoading(false));
        }
    }, [isOnlyVisibleFilterChecked]);

    // useEffect(() => {
    //     if(!isOnlyVisibleFilterChecked) setNews(news.filter(news => news.isVisible = false));
    // } ,[isOnlyVisibleFilterChecked]);

    function renderNews() {
        if(isLoading) return <h2>Carregando...</h2>
        else if (news.length > 0) {
            return news.map(news => {
                return (
                    <div key={`news-author-${news.id}`} className={`${styles.newsBox} margin-y text-center`} onClick={() => {
                        setMode(Mode.EDIT);
                        onClick(news);
                    }}>
                        <div>
                            <img src={news.imageUrl} alt="" />
                        </div>

                        <div>
                            <div>
                                <h1>{news.title}</h1>
                            </div>

                            <div>
                                <div>{news.description}</div>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            return (
                <div className="flex-row-center">
                    <h2>Nenhuma notícia encontrada, crie uma ou mude o termo de busca</h2>
                </div>
            )
        }
    }

    function filterNewsByTitle(title: string) {
        Request.get(`/news?filter=titleAndAuthor&authorId=${user?.id}&title=${title}`)
            .then(resp => {
                setNews(resp.data);
                setPages(resp.pages);
                setTotal(resp.total);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="flex-column-center">
            <div>
                <h3>Noticias criadas (clique para editar)</h3>
            </div>

            <form action="" className="full-width">
                <div>
                    <div className="text-center">
                        <label htmlFor="title" >Filtar pelo titulo</label>
                    </div>

                    <div className="full-width flex-row-center">
                        <input type="text" className="input" onChange={e => filterNewsByTitle(e.target.value)} />
                    </div>
                </div>

                <div className="margin-y">
                    <div className="text-center">
                        <label htmlFor="only-visibles" >Apenas publicadas</label>
                    </div>

                    <div className="full-width flex-row-center">
                        <input type="checkbox" checked={isOnlyVisibleFilterChecked} className="only-visibles" id="only-visibles" onChange={e => setIsOnlyVisibleFilterChecked(!isOnlyVisibleFilterChecked)} />
                    </div>
                </div>
            </form>

            <section className="margin-y flex-column-center">
                {renderNews()}

                <Paginator PageUrl="/admin/news?q=" currentPage={page} pages={pages} />
            </section>
        </div>
    )
}