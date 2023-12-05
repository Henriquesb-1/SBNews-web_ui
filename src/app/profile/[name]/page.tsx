import Layout from "@/components/layout/Layout";
import Profile from "@/components/user/Profile";

interface ParamsProps {
    params: { name: string };
}

export default function Page({ params }: ParamsProps) {
    const { name } = params;

    return (
        <Layout>
            <Profile userName={name} />
        </Layout>
    )
}