interface ParamsProps {
    params: { info: string };
}

export default function Page({ params }: ParamsProps) {
    return (
        <h1>{params.info}</h1>
    )
}