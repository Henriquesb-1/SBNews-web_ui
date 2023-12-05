import DateInfo from "./DateInfo";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Menu from "./menu/Menu";

interface LayoutProps {
    children: React.ReactNode;
    hideDateInfo?: boolean;
    showTopNews?: boolean;
    showMoneyAnd?: boolean;
}

export default function Layout({ children, hideDateInfo, showTopNews, showMoneyAnd }: LayoutProps) {

    return (
        <div className="app">
            <Header />
            <Menu /> 
            <main className="flex-column-center">
                {!hideDateInfo ? <DateInfo /> : false}
                {children}
            </main>
            <Footer />
        </ div>
    )
}