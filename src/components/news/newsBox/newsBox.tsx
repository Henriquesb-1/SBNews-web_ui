import styles from "./newsBox.module.scss";

interface NewsDivProps {
    title: string
    linkTitle?: string
    category: string
    imageURL?: string
    description: string
    link?: string
    isInNewsManager?: boolean
}

export default function NewsBox(props: NewsDivProps) {
    return (
        <div className={styles.news}>
            <div className={styles.newsImg}>
                <img src={props.imageURL} alt="" />
            </div>
            <div className={styles.newsInfo}>
                <div className={styles.newsTitle} >
                    <h2>
                        {props.isInNewsManager ? props.title : (
                            <a className="clean-link" href={props.link} title={props.linkTitle}>
                                {props.title}
                            </a>
                        )}
                    </h2>
                </div>
                <div className="news-category">
                    <h3>
                        <a href={`/categories/${props.category}`} title={`Notícias sobre ${props.category}`}>{props.category}</a>
                    </h3>
                </div>
                <div className={styles.newsDescription}>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )

}