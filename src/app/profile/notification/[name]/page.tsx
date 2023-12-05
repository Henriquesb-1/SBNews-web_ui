import Layout from "@/components/layout/Layout";

interface ParamsProps {
    params: { name: string };
}

export default function Page({ params }: ParamsProps) {
    const { name } = params;

    return (
        <Layout>
            <div>{name}</div>
        </Layout>
    )
}