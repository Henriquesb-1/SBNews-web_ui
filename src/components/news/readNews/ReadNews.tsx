import styles from "./readNews.module.scss";
import Request from "@/model/Request";
import RelatedNews from "./relatedNews";
import { NewsRead } from "@/model/News";
import Comments from "@/components/comments/Comments";

export default async function ReadNews({ newsTitle }: { newsTitle: string }) {
    try {
        const newsRequest = await Request.fetch(`/news?filter=read&title=${newsTitle}`, { cache: 'no-store' });
        const news: NewsRead = await newsRequest.json();
        
        return (
            <>
                <article>
                    <div className={styles.newsRead}>
                        <section>
                            <div className="news-content-read">
                                <div>
                                    <div className={styles.newsReadInfo}>
                                        <h1>{news.title}</h1>
                                        <div className={styles.newsSubInfo}>
                                            <div>
                                                <a href={`/newsAuthor/${news.author}/1`} style={{ color: "inherit" }}>
                                                    <span>{news.author}</span>
                                                </a>
                                            </div>
    
                                            <div>
                                                <span>{news.dateCreated}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.newsContentImg}>
                                        <img src={news.imageUrl} alt="" />
                                    </div>
                                    <div className={styles.newsContentRead1} dangerouslySetInnerHTML={{ __html: news.content ?? "" }}></div>
                                </div>
                            </div>
                        </section>
    
                        <div className="related-news-container">
                            <RelatedNews />
                        </div>
    
                        <section id="comments" className={styles.commentSection}>
                            <Comments newsId={news.id} />
                        </section>
                    </div>
                </article>
            </>
        )
    } catch (error) {
        return <h1>Error</h1>
    }
}