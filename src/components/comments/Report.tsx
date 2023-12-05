import useAuthContext from "@/contextApi/hook/useAuthContext";
import Comment from "@/model/Comments";
import Request from "@/model/Request";
import FeedBack from "@/utils/FeedBack";
import { useState } from "react";

import flag from "../../assets/flag.svg";

import styles from "./report.module.scss";

interface ReportProps {
    type: string;
    newsOrigenId: number;
    comment: Comment;
}

export default function Report({ type, newsOrigenId, comment }: ReportProps) {
    const [reportedFor, setReportedFor] = useState<string>("");
    const [customReport, setCustomReport] = useState<string>("");
    const [boxVisibility, setBoxVisibility] = useState<boolean>(false);

    const { user } = useAuthContext();

    function handleReport() {
        const data = {
            type,
            reason: reportedFor === "outro" ? customReport : reportedFor,
            content: comment.content,
            newsOrigenId,
            author: { id: user?.id },
            reported: { id: comment.author.id },
            commentTarget: comment.commentId,
            answerTarget: comment.answerId
        }

        Request.post("/report", data, localStorage.getItem("at") || "")
            .then(resp => FeedBack.success("Obrigado! Sua denuncia ajuda a manter uma discussão saudavel"))
            .catch(err => FeedBack.error("Erro ao submeter denuncia"));
    }

    return (
        <>
            <div className={styles.reportButton}>
                <button onClick={() => setBoxVisibility(!boxVisibility)} title="Denunciar">
                    <img src={flag.src} alt="" />
                </button>
                {boxVisibility ? (
                    <div className={styles.reportBox}>
                        <h5>Qual o problema?</h5>
                        <div className={styles.option}>
                            <input type="radio" name="report-group" id="denuncia-por-violência" value="Violencia" onChange={event => setReportedFor(event.target.value)} />
                            <label htmlFor="denuncia-por-violência">Violência</label>
                        </div>
                        <div className={styles.option}>
                            <input type="radio" name="report-group" id="denuncia-por-preconceito/descriminação" value="Preconceito/discriminação" onChange={event => setReportedFor(event.target.value)} />
                            <label htmlFor="denuncia-por-preconceito/descriminação">Preconceito/discriminação</label>
                        </div>
                        <div className={styles.option}>
                            <input type="radio" name="report-group" id="denuncia-por-apologia-crime-ou-drogas" value="Apologia as drogas ou crime" onChange={event => setReportedFor(event.target.value)} />
                            <label htmlFor="denuncia-por-apologia-crime-ou-drogas">Apologia as drogas ou crime</label>
                        </div>
                        <div className={styles.option}>
                            <input type="radio" name="report-group" id="denuncia-por-ódio" value="Discurso de ódio" onChange={event => setReportedFor(event.target.value)} />
                            <label htmlFor="denuncia-por-ódio">Discurso de ódio</label>
                        </div>
                        <div className={styles.option}>
                            <div>
                                <input type="radio" name="report-group" id="denuncia-por-outro-motivo" value="outro" onChange={event => setReportedFor(event.target.value)} />
                                <label htmlFor="denuncia-por-outro-motivo">Outro:</label>
                            </div>
                            <div className="describe-report">
                                <input type="text" value={customReport} placeholder="Descreva brevemente" maxLength={50} disabled={reportedFor !== "outro"} onChange={event => setCustomReport(event.target.value)} />
                            </div>
                        </div>
                        <div className="flex-row">
                            <button className="button-save" onClick={handleReport}>Denunciar</button>
                        </div>
                    </div>
                ) : <></>}
            </div>
        </>
    )
}