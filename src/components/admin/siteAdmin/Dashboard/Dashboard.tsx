"use client";

import UsersCount from "./UsersCount";
import ReportBox from "./ReportBox";

interface DashboardProps {
    currentPage: string;
}

export default function Dashboard({ currentPage }: DashboardProps) {
    return (
        <>
            <section>
                <div>
                    <UsersCount />
                </div>
            </section>

            <section className="flex-column-center" style={{marginTop: "15px"}}>
                <ReportBox currentPage={currentPage} title="Comentários denunciados" type="comment" />
                <ReportBox currentPage={currentPage} title="Respostas denunciados" type="answer" />
            </section>
        </>
    )
}