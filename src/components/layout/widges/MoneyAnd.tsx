"use client";

import { useState } from "react";
import Money from "./Money";

import styles from "./widges.module.scss";

export default function MoneyAnd() {
    const [currentWidget, setCurrentWidget] = useState<string>("currence");

    function renderWidget() {
        switch (currentWidget) {
            case "currence":
                return <Money />
            case "widget":
                return <h2>Widget</h2>
        }
    }

    return (
        <section className={`flex-column-center ${styles.widgeSection}`} style={{ width: "100%" }}>
            <div className={`flex-row-center ${styles.widgesWrapper}`}>
                <div>
                    <button className="clean-button text-white" style={{ backgroundColor: currentWidget === "currence" ? "rgb(0, 0, 105)" : "" }} onClick={() => setCurrentWidget("currence")}>Economia</button>
                </div>

                <div>
                    <button className="clean-button text-white" style={{ backgroundColor: currentWidget === "widget" ? "rgb(0, 0, 105)" : "" }} onClick={() => setCurrentWidget("widget")}>Widge</button>
                </div>
            </div>


            {renderWidget()}
        </section>
    )
}