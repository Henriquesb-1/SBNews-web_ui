interface StatProps {
    title: string;
    value: number;
}

export default function Stat({ title, value }: StatProps) {
    return (
        <li>
            <div>
                <h2>{title}</h2>
            </div>

            <div>
                <span>{value}</span>
            </div>
        </li>
    )
}