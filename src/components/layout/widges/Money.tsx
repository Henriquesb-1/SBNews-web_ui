"use client";

import Axios from "axios";
import { useState, useEffect } from "react";

import styles from "./money.module.scss";

interface MoneyProps {
    currence: string;
    ask: string;
    bid: string;
    pctChange: string;
}

function MoneyBox({ currence, ask, bid, pctChange }: MoneyProps) {
    return (
        <div className={styles.moneyBox}>
            <h2>{currence}</h2>
            <div className={styles.moneyBoxTitle}>
                <div>
                    <span>Compra: {ask}</span>
                </div>
            </div>

            <div className={styles.moneyBoxTitle}>
                <div>
                    <span>Venda: {bid}</span>
                </div>
            </div>

            <div className={styles.moneyBoxTitle}>
                <div>
                    <span>Variação: {pctChange}</span>
                </div>
            </div>
        </div>
    )
}

export default function Money() {
    const [dolar, setDolar] = useState<MoneyProps>({ currence: "", ask: "0", bid: "", pctChange: "0" });
    const [euro, setEuro] = useState<MoneyProps>({ currence: "", ask: "0", bid: "", pctChange: "0" });

    useEffect(() => {
        function formatMoney(currency: string): string {
            const toFloat = parseFloat(currency).toFixed(2);
            return `R$${toFloat.toString().replace(".", ",")}`;
        }

        Axios.get("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
            .then(resp => {
                const dolar: MoneyProps = resp.data.USDBRL;
                const euro: MoneyProps = resp.data.EURBRL;

                setDolar({ currence: "Dólar", ask: formatMoney(dolar.ask), bid: formatMoney(dolar.bid), pctChange: dolar.pctChange + "%" });
                setEuro({ currence: "Euro", ask: formatMoney(euro.ask), bid: formatMoney(euro.bid), pctChange: euro.pctChange + "%" });
            })
    }, [])

    return (
        <div className="flex-row-around">
            <MoneyBox currence={dolar.currence} ask={dolar.ask} bid={dolar.bid} pctChange={dolar.pctChange} />
            <MoneyBox currence={euro.currence} ask={euro.ask} bid={euro.bid} pctChange={euro.pctChange} />
        </div>
    )
}