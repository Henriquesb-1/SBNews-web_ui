import { useState } from "react";

import RenderUsers from "./RenderUsers";

import styles from "./users.module.scss";

export default function Users({page}: {page: string}) {
    const [userType, setUserType] = useState<string>("normal");
    const [muted, setMuted] = useState<string>("");
    const [banned, setBanned] = useState<string>("");

    return (
        <div className="flex-column-center">
            <div className="flex-row-around full-width">
                <div className={styles.filters}>
                    <div>
                        <label htmlFor="user-type">Tipo</label>
                    </div>

                    <div>
                        <select name="user-type" id="user-type" onChange={e => setUserType(e.target.value)}>
                            <option value="normal">Normal</option>
                            <option value="admin">Administrador</option>
                            <option value="news_creator">Editores</option>
                        </select>
                    </div>
                </div>

                <div className={styles.filters}>
                    <div>
                        <label htmlFor="silenced">Silenciado</label>
                    </div>

                    <div>
                        <select name="silenced" id="silenced" onChange={e => setMuted(e.target.value)}>
                            <option value="">Não</option>
                            <option value="true">Sim</option>
                        </select>
                    </div>
                </div>

                <div className={styles.filters}>
                    <div>
                        <label htmlFor="banned">Banidos</label>
                    </div>

                    <div>
                        <select name="banned" id="banned" onChange={e => setBanned(e.target.value)}>
                            <option value="">Não</option>
                            <option value="true">Sim</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <RenderUsers userType={userType} muted={muted} banned={banned} page={page} />
            </div>
        </div>
    )
}