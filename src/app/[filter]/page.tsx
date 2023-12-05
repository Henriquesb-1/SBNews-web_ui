import Layout from "@/components/layout/Layout";
import ListNews from "@/components/news/listNews/listNews";
import ReadNews from "@/components/news/readNews/ReadNews";

interface ParamsProps {
    params: { filter: string };
    searchParams: {
        p: string;
        v: string;
        page: string;
    }
}

export default function Page({ params, searchParams }: ParamsProps) {
    const { filter } = params;
    const { p, v, page } = searchParams;
    const showProps = filter !== "read";

    return (
        <Layout showTopNews={showProps}>
            {filter === "read"
                ? <ReadNews newsTitle={v} />
                : <ListNews filter={filter} param={p} value={v}
                    currentPage={page || "1"} pageUrl={`/${filter}?p=${p}&v=${v}`}
                />}
        </Layout>
    )
}