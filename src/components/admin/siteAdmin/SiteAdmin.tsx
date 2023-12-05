import Dashboard from "./Dashboard/Dashboard"
import Settings from "./settings/Settings";
import Users from "./users/Users";

export default function SiteAdmin({ path, page }: { path: string, page: string }) {
    function renderSiteAdmin() {
        let finalElement = <></>

        switch(path) {
            case "dashboard":
                finalElement = <Dashboard currentPage="" />
            break;

            case "users":
                finalElement = <Users page={page} />
            break;

            case "config":
                finalElement = <Settings />
            break;
        }

        return finalElement;

    }

    return <>{renderSiteAdmin()}</>
}