import Link from "next/link";

export default function Logo() {
    return (
        <div className="logo-container">
            <h1>
                <Link href="/?filter=all" title="Ir para página inicial" className="clean-link">
                    <span> SB News </span>
                </Link>
            </h1>
        </div>
    )
}