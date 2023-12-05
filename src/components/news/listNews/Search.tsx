"use client";

import { useState } from "react";

import styles from "./search.module.scss";

export default function Search() {
    const [title, setTitle] = useState<string>("");

    function handleSubmit(e: any) {
        e.preventDefault();

        window.location.replace(`/search?p=title&v=${title}`);
    }

    return (
        <div className="flex-row-center">
            <form className={`${styles.searchForm} flex-row-around`}>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Pesquise pelo titulo" />
                <button type="submit" onClick={e => handleSubmit(e)} className={`clean-button`}>
                    <span>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </button>
            </form>
        </div>
    )
}