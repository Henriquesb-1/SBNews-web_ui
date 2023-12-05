"use client";

import { useEffect, useState } from "react";

import styles from "./dateInfo.module.scss";

function renderDate(date: any) {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    date = new Date(`${date}`).toLocaleDateString("pt-br");
    date = date.split("/");

    date[0] = Number.parseInt(date[0]);
    date[1] = Number.parseInt(date[1]);

    date[0] = date[0] + 1;
    date[1] = months[date[1] - 1];

    return date.join(" de ");
};

export default function DateInfo() {
    const [date, setDate] = useState<string>();
    const [time, setTime] = useState<string>();

    useEffect(() => setDate(renderDate(new Date())), []);

    setTimeout(() => {
        const date = new Date().toLocaleString("pt-br");
        setTime(date.split(",")[1]);
    }, 1000)

    return (
        <div className={`${styles.timePanel} flex-column-center`}>
            <div>
                <span>{date}</span>
            </div>
            <div>
                <span>{time}</span>
            </div>
        </div>
    )
}