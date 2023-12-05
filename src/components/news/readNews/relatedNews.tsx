// import { useEffect, useState } from "react";

// import NewsModel from "../../../model/News";
// import APIRequest from "../../../model/APIRequest";

// import "./relatedNews.scss"

// interface relatedNewsProps {
//     newsId: string | undefined
//     categoryId: number
// }

// export default function RelatedNews(props: relatedNewsProps) {
//     const [relatedNews, setRelatedNews] = useState<NewsModel[]>([]);

//     useEffect(() => {
//         APIRequest.get(`/news/related_news?categoryId=${props.categoryId}&newsId=${props.newsId}`)
//             .then(resp => setRelatedNews(resp.data));
//     }, [])

//     function renderRelatedNews() {
//         return relatedNews.map((news: NewsModel, index: number) => {
//             return (
//                 <div key={`related-news-${index}`} className="related-news-content">
//                     <a href={`/read/${news.id}`} title={`${news.title}`}>
//                         <img src={news.imageUrl} alt={news.title} width={"100%"} height={110} />
//                         <h3>
//                             {news.title}
//                         </h3>
//                     </a>
//                 </div>
//             )
//         })
//     }

//     return (
//         <>
//             <div className="related-news-invite">
//                 <h3>Leia também:</h3>
//             </div>

//             <div className="related-news">
//                 {renderRelatedNews()}
//             </div>
//         </>
//     )
// }

export default function RelatedNews() {
    return <h1></h1>
}