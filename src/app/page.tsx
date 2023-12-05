import Layout from "@/components/layout/Layout";
import ListNews from "@/components/news/listNews/listNews";

interface ParamsProps {
  searchParams: { page: string}
}

export default function Home({ searchParams }: ParamsProps) {
  const { page } = searchParams;
  return (
    <Layout showTopNews>
      <ListNews filter={"all"} pageUrl={`/?filter=all`} currentPage={page || "1"} 
      />
    </Layout>
  )
}
