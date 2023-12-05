import Admin from "@/components/admin/Admin";
import Layout from "@/components/layout/Layout";

interface ParamsProps {
    params: { path: string };
    searchParams: {
        page: string;
    }
}

export default function Page({ params, searchParams }: ParamsProps) {
    const { path } = params;
    const { page } = searchParams;

    return (
        <Layout hideDateInfo>
            <Admin path={path} page={page || "1"} />
        </Layout>
    )
}