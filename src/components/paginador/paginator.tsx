import { Dispatch, SetStateAction, useMemo } from "react";

import "./paginator.scss";

interface PaginatorProps {
    pages: number
    currentPage: any
    PageUrl: string
}

export default function Paginator(props: PaginatorProps) {
    const pages = useMemo(() => getNecessariesPages(props.pages), [props.pages])

    function getNecessariesPages(pages: number) {
        const paginationNumber: number[] = [];
        for (let i: number = 1; i <= pages; i++) paginationNumber.push(i);
        return paginationNumber;
    }

    function renderPaginationList() {
        const pageItem = pages;

        if (pageItem.length >= 2) {
            return pageItem.map((pageNumber: number, index: number) => {
                return (
                    <li key={`pagination-item-${index}`} className={`page-item ${props.currentPage == index + 1 ? "active" : ""}`}>
                        <a href={`${props.PageUrl}&page=${index + 1}`} className="page-link">
                            {pageNumber}
                        </a>
                    </li>
                )
            })
        }
    }

    return (
        <div className="pagination-container">
            <nav aria-label="Page navegation" >
                <ul className="pagination">
                    {renderPaginationList()}
                </ul>
            </nav>
        </div>
    )
}