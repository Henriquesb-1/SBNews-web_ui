"use client";

import { useState, useEffect } from "react";
import Stats from "../../stats/Stats";
import Stat from "../../stats/Stat";
import Request from "@/model/Request";

export default function UsersCount() {
    const [users, setUsers] = useState<number>(0);
    const [muteds, setMuteds] = useState<number>(0);
    const [banneds, setBanneds] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem("at") || "";

        if (token) {
            Request.get("/stats/admin", token)
                .then(resp => {
                    setUsers(resp.users)
                    setMuteds(resp.muteds)
                    setBanneds(resp.banned)
                })
        }
    }, [])

    return (
        <Stats>
            <Stat title="Usuários cadastrados" value={users} />
            <Stat title="Usuários silenciados" value={muteds} />
            <Stat title="Usuários banidos" value={banneds} />
        </Stats>
    )
}