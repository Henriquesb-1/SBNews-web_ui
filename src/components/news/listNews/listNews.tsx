import Paginator from "../../paginador/paginator";
import NewsBox from "../newsBox/newsBox";
import Loading from "../../template/loading/loading";
import Error from "../../template/error/error";

import Request from "@/model/Request";
import Search from "./Search";
import MoneyAnd from "@/components/layout/widges/MoneyAnd";
import TopNews from "../topNews/topNews";

interface ListAllNewsProps {
    filter: string;
    pageUrl: string;
    currentPage: string;
    param?: string;
    value?: string;
};

export default async function ListNews({ filter, pageUrl, currentPage, param, value }: ListAllNewsProps) {
    try {
        let loading = true;

        const request = await Request.fetch(`/news?filter=${filter}&${param}=${value}&page=${currentPage}`, { cache: 'no-store' });
        const { data, pages, total } = await request.json();

        function renderNews() {
            loading = false;

            if (loading) return <Loading />
            else if (data.length === 0) {
                return (
                    <div>
                        <h1>Nenhuma notícia cadastrada</h1>
                    </div>
                )
            }
            else {
                return data.map((news: any, index: number) => {
                    return (
                        <div key={`news-list-${index}`} style={{ width: "100%" }}>
                            <NewsBox key={`news-box-${index}`} title={news.title} category={news.category.name} description={news.description}
                                link={`/read?p=title&v=${news.title}`} imageURL={news.imageUrl} linkTitle={news.title} />
                        </div>
                    )
                })
            }
        }

        return (
            <div className="all-news">
                <section className="flex-row-center">
                    <TopNews />
                </section>

                <section>
                    <Search />
                    <section className="list-news">
                        {renderNews()}
                        <Paginator PageUrl={`${pageUrl}`} pages={pages} currentPage={currentPage} />
                    </section>
                </section>

                <section>
                    <MoneyAnd />
                </section>
            </div>
        )
    } catch (error) {
        return <Error />
    }
}