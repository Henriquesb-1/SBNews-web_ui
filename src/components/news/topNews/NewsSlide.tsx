"use client";

import { useState } from "react";
import styles from "./newsSlide.module.scss";

interface NewsSlideProps {
    title: string;
    imageUrl: string;
}

export default function NewsSlide({ title, imageUrl }: NewsSlideProps) {
    const [offset, setOffset] = useState<number>(0);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const increment = () => {
        setOffset(offset + 100);
        setCurrentSlide(currentSlide + 1);
    }

    const decrement = () => {
        setOffset(0);
        setCurrentSlide(0);
    }

    if (offset === 500) decrement();

    setTimeout(increment, 5000);

    return (
        <>
            <div className={styles.topNewsContainer} style={{ left: `-${offset}%` }}>
                <div className={`${styles.topNewsImage}`}>
                    <img src={imageUrl} alt="Imagem" />
                </div>
                <div className="top-news-title">
                    <h3>
                        <a className="clean-link" href={`/read?p=title&v=${title}`}>
                            {title}
                        </a>
                    </h3>
                </div>
            </div>
        </>
    )
}