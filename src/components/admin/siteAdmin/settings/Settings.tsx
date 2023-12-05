import useAuthContext from "@/contextApi/hook/useAuthContext";
import AdminConfig from "@/model/AdminConfig";
import Request from "@/model/Request";
import FeedBack from "@/utils/FeedBack";
import { useEffect, useState } from "react";

export default function Settings() {
    const [timesCanBeWarned, setTimesCanBeWarned] = useState<number>(5);
    const [timesCanBeSilenced, setTimesCanBeSilenced] = useState<number>(5);
    const [defaultSilencedDays, setDefaultSilencedDays] = useState<number>(5);
    const [lastChangeBy, setLastChangeBy] = useState<string>("");

    const { user } = useAuthContext();

    useEffect(() => {
        Request.get("/admin/config", localStorage.getItem("at") || "")
            .then((resp: AdminConfig) => {
                const { timesCanBeWarned, timesCanBeSilenced, defaultSilencedDays, lastChangeBy } = resp;
                setTimesCanBeWarned(timesCanBeWarned);
                setTimesCanBeSilenced(timesCanBeSilenced);
                setDefaultSilencedDays(defaultSilencedDays);
                setLastChangeBy(lastChangeBy);
            });
    }, []);

    function handleSubmit(e: any) {
        e.preventDefault();
        setLastChangeBy(user?.name || "");

        Request.put("/admin/config", { timesCanBeWarned, timesCanBeSilenced, defaultSilencedDays, lastChangeBy: user?.name }, localStorage.getItem("at") || "")
            .then(resp => FeedBack.success("Configurações alteradas"))
            .catch(err => FeedBack.error("Erro ao alterar configurações"));
    }

    return (
        <>
            <form className="full-width flex-column-center">
                <div className="flex-column-center margin-y">
                    <div>
                        <label htmlFor="timesCanBeWarned">Vezes que um usuário pode ser advertido</label>
                    </div>

                    <div>
                        <input type="number" name="timesCanBeWarned" value={timesCanBeWarned} onChange={e => setTimesCanBeWarned(Number.parseInt(e.target.value || "5"))} />
                    </div>
                </div>

                <div className="flex-column-center margin-y">
                    <div>
                        <label htmlFor="timesCanBeSilenced">Vezes que um usuário pode ser silenciado</label>
                    </div>

                    <div>
                        <input type="number" name="timesCanBeSilenced" value={timesCanBeSilenced} onChange={e => setTimesCanBeSilenced(Number.parseInt(e.target.value || "5"))} />
                    </div>
                </div>

                <div className="flex-column-center margin-y">
                    <div>
                        <label htmlFor="timesCanBeWarned">Dias padrão de silenciamento</label>
                    </div>

                    <div>
                        <input type="number" name="timesCanBeWarned" value={defaultSilencedDays} onChange={e => setDefaultSilencedDays(Number.parseInt(e.target.value || "5"))} />
                    </div>
                </div>

                <div>
                    <button className="button-save" type="submit" onClick={e => handleSubmit(e)}>Salvar</button>
                </div>
            </form>

            <div className="flex-row-center margin-y">
                <span>Administrador {lastChangeBy} mudou pela ultima vez</span>
            </div>
        </>
    )
}