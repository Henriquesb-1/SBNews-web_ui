import loading from "../../../assets/loading.gif";

import styles from "./loading.module.scss"

export default function LoadingTemplate() {
    return (
        <div className={styles.loadingTemplate}>
            <div>
                <img src={loading.src} alt="" width={75} height={75} />
            </div>
        </div>
    )
}