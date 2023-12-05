import styles from "./footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="flex-row-around">
                <ul className="list">
                    <h4>Site</h4>

                    <li>
                        <a className="clean-link" href="/about/licence">Licenças</a>
                    </li>
                    <li>
                        <a className="clean-link"  href="/about/technologies">Tecnologias</a>
                    </li>
                </ul>

                <ul className="list">
                    <h4>Author</h4>

                    <li>
                        <a className="clean-link"  href="/about/author">Contato</a>
                    </li>
                    <li>
                        <a className="clean-link"  href="/about/portfolio">Portfólio</a>
                    </li>
                </ul>
            </div>

            <div className={styles.copyright}>
                <span>©2023 SBNews</span>
            </div>
        </footer>
    )
}