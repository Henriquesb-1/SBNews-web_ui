import Request from "@/model/Request";

import styles from "./topNews.module.scss";
import NewsSlide from "./NewsSlide";
import { topNewsProps } from "@/model/News";

interface TopNews {
    imageUrl: string;
    title: string;
}

export default async function TopNews() {
    const request = await Request.fetch("/news?filter=topNews", { cache: 'no-store' });
    const topNews: topNewsProps[] = await request.json();

    function renderTopNews() {
        if (topNews.length === 0) {
            return <></>
        } else {
            return topNews.map((news, index: number) =>
                <NewsSlide key={`top-news-${news.id}`} title={news.title} imageUrl={news.imageUrl} itens={topNews.length} />
            )
        }
    }

    return (
        <div className={styles.topNews}>
            <div>
                <h2>Mais acessadas</h2>
            </div>
            <div className={styles.topNews}>
                <div className={styles.topNewsItems}>
                    {renderTopNews()}
                </div>
            </div>
        </div>
    )
}