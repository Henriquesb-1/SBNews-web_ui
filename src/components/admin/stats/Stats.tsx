import styles from "./Stats.module.scss";

export default function Stats({ children }: {children: React.ReactNode}) {
    return (
        <ul className={`flex-row-around list ${styles.statList}`} style={{textAlign: "center"}}>
            {children}
        </ul>
    )
}