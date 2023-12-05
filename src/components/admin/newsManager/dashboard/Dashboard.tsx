"use client";

import { useEffect, useState } from "react";

import Stat from "../../stats/Stat";
import Stats from "../../stats/Stats";
import Request from "@/model/Request";
import useAuthContext from "@/contextApi/hook/useAuthContext";
import { NewsRead } from "@/model/News";

export default function Dashboard() {
    const [totalVisits, setTotalVisits] = useState<number>(0);
    const [newsMoreAccessed, setNewsMoreAccessed] = useState<NewsRead>();

    const { user } = useAuthContext();

    useEffect(() => {
        const token = localStorage.getItem("at") || "";
        
        Request.get(`/stats/newsManager?userId=${user?.id}`, token)
            .then(resp => setTotalVisits(resp));

        Request.get(`/stats/newsManager?userId=${user?.id}&type=newsMoreAccessed`, token)
            .then(resp => setNewsMoreAccessed(resp));
    }, []);

    return (
        <div>
            <div>
                <Stats>
                    <Stat title="Total de visitas recebidas" value={totalVisits} />
                </Stats>
            </div>

            <div className="flex-column-center">
                <div>
                    <h3>Noticia mais acessada ({newsMoreAccessed?.visits} visitas)</h3>
                    <span></span>
                </div>

                <div>
                    <div>
                        <img src={newsMoreAccessed?.imageUrl} alt={newsMoreAccessed?.title} />
                    </div>

                    <div>
                        <h3>
                            <a href={`/read?param=id&value=${newsMoreAccessed?.id}`} className="clean-link" target="blank">{newsMoreAccessed?.title}</a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}