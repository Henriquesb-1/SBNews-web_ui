import Category from "./categories/Category";
import Dashboard from "./dashboard/Dashboard";
import News from "./news/News";

interface NewsManagerProps {
    path: string;
    page: string;
}

export default function NewsManager({ path, page }: NewsManagerProps) {

    function renderNewsManagerContent(): JSX.Element {
        let finalElement = <></>

        switch(path) {
            case "dashboard":
                finalElement = <Dashboard />;
            break;

            case "categories":
                finalElement = <Category />
            break;

            case "news":
                finalElement = <News page={page} />
            break;
        }

        return finalElement;
    }

    return <div>{renderNewsManagerContent()}</div>
}