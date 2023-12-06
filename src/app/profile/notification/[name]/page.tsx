import Layout from "@/components/layout/Layout";
import Notification from "@/components/user/Notifications";

interface ParamsProps {
    params: { name: string };
}

export default function Page({ params }: ParamsProps) {
    const { name } = params;

    return (
        <Layout>
            <Notification userName={name} />
        </Layout>
    )
}