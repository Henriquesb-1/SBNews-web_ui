import React, { useEffect, useState } from "react";
import { Report, Reported } from "@/model/Report";
import Request from "@/model/Request";
import Loading from "@/components/template/loading/loading";
import Error from "@/components/template/error/error";

import FeedBack from "@/utils/FeedBack";

import styles from "./reportBox.module.scss";
import AdminConfig from "@/model/AdminConfig";
import AlertBox from "./AlertBox";

interface ReportBoxProps {
    type: string;
    currentPage: string;
    title: string;
}

const blankReported: Reported = { id: 0, name: "", warnedTimes: 0, silencedTimes: 0, mutedTime: 0, isBanned: false };
const blankReport: Report = { id: 0, type: "", reason: "", author: { id: 0, name: "" }, content: "", newsOrigenId: 0, reported: blankReported }

export default function ReportBox({ type, currentPage, title }: ReportBoxProps) {
    const [reports, setReports] = useState<Report[]>([]);
    const [reportToHandle, setReportToHandle] = useState<Report>(blankReport);

    const [adminConfig, setAdminConfig] = useState<AdminConfig>({ timesCanBeWarned: 5, timesCanBeSilenced: 5, defaultSilencedDays: 7, lastChangeBy: "" });
    let [page, setPage] = useState<number>(0);
    const [totalReports, setTotalReports] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true)
    const [showErrorScreen, setShowErrorScreen] = useState<boolean>(false);

    const [isReportTableOpen, setIsReportTableOpen] = useState<boolean>(false);
    const [alertBoxProps, setAlertBoxProps] = useState<{ isOpen: boolean, open: string }>({ isOpen: false, open: "" });

    const [actionProps, setActionProps] = useState<{ willDeleteContent: boolean, author: string }>({ willDeleteContent: false, author: "" });

    useEffect(() => {
        const userToken = localStorage.getItem("at") || "";

        Request.get("/admin/config", userToken)
            .then(resp => setAdminConfig(resp));

        Request.get(`/total?type=report&param=${type}`, userToken)
            .then(resp => setTotalReports(resp));
    }, []);

    function renderAlertBoxOrNot() {
        if (alertBoxProps.open === "advertTimesAlert") {
            return <AlertBox
                alert={`Usuario já foi advertido mais de ${adminConfig.timesCanBeWarned} vezes. Ao continuar, usuario será silenciado por ${adminConfig.defaultSilencedDays} dias`}
                handleAction={() => handleActions(true)}
                closeBox={() => setAlertBoxProps({ isOpen: false, open: "" })}

            />
        } else if (alertBoxProps.open === "silencedTimesAlert") {
            return <AlertBox
                alert={`Usuario já foi silenciado mais de ${adminConfig.timesCanBeSilenced}. Ao continuar, usuario terá sua conta banida`}
                handleAction={() => handleActions(true)}
                closeBox={() => setAlertBoxProps({ isOpen: false, open: "" })}
            />
        }
    }

    function handleActions(skipChecks: boolean = false) {
        const userToken = localStorage.getItem("at") || "";

        const report = reportToHandle;

        switch (actionProps.author) {
            case "advert":
                const warnedTimes = report.reported.warnedTimes || 0;
                report.reported.warnedTimes = warnedTimes + 1;
                break;

            case "silence":
                const now = Math.floor(Date.now() / 1000);
                const mutedFor = now + 60 * 60 * 24 * 7 //7 dias;
                const silencedTimes = report.reported.silencedTimes || 0;
                report.reported.silencedTimes = silencedTimes + 1;
                report.reported.mutedTime = mutedFor;
                break;

            case "ban":
                report.reported.isBanned = true;
                break;
        }

        const { willDeleteContent, author } = actionProps;

        if (report.reported.warnedTimes >= adminConfig.timesCanBeWarned && !skipChecks) {
            setAlertBoxProps({ isOpen: true, open: "advertTimesAlert" });
        } else if (report.reported.silencedTimes >= adminConfig.timesCanBeSilenced && !skipChecks) {
            setAlertBoxProps({ isOpen: true, open: "silencedTimesAlert" });
        } else {
            Request.put(`/report`, { report, willDeleteContent, willPushishAuthor: author }, userToken)
                .then(resp => {
                    setReports(reports.filter(oldReport => oldReport.id !== report.id));
                    FeedBack.success(resp);
                })
                .catch(err => FeedBack.error("Erro ao executar ações"));
        }

    }

    function loadMoreReports() {
        setPage(++page);

        Request.get(`/report?type=${type}&page=${page}`, localStorage.getItem("at") || "")
            .then(resp => setReports(reports.concat(resp.data)))
            .catch(err => FeedBack.error("Erro ao carregar"));
    }

    function renderReportTable() {

        function handleReportTableVisibility(id: number) {
            const element = document.getElementById(`${id}`);
            if (element) {
                if (element.style.display === "none") element.style.display = "table-row";
                else element.style.display = "none";
            }
        }

        return reports.map((report, index) => {
            return (
                <React.Fragment key={`report-item-${index}`} >
                    <tr onClick={e => {
                        handleReportTableVisibility(index);
                        setReportToHandle(report);
                    }}>
                        <td>{report.reason}</td>
                        <td>{report.author.name}</td>
                        <td>{report.reported.name}</td>
                    </tr>

                    <tr id={`${index}`} className={`${styles.complementContent}`}>
                        <td colSpan={3}>
                            <div className={styles.contentToAnalyze}>
                                <div className={styles.contentDescription}>
                                    <div>
                                        <h4>Conteudo:</h4>
                                    </div>

                                    <div>
                                        <p>{report.content}</p>
                                    </div>
                                </div>

                                <div>
                                    <p>O que deseja fazer?</p>
                                </div>

                                <div className={styles.contentActions}>
                                    <div>
                                        <div className={styles.selectAction}>
                                            <div>
                                                <label htmlFor="content">Conteudo</label>
                                            </div>

                                            <div>
                                                <select name="content" id="content" onChange={e => setActionProps({ willDeleteContent: !!e.target.value, author: actionProps.author })}>
                                                    <option value="">Manter</option>
                                                    <option value="true">Excluir</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.selectAction}>
                                            <div>
                                                <label htmlFor="author">Autor</label>
                                            </div>

                                            <div>
                                                <select name="author" id="author" onChange={e => setActionProps({ willDeleteContent: actionProps.willDeleteContent, author: e.target.value })}>
                                                    <option value="">Nada</option>
                                                    <option value="advert">Advertir</option>
                                                    <option value="silence">Silenciar</option>
                                                    <option value="ban">Banir</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <button className="button-save" onClick={() => handleActions()}>Salvar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </React.Fragment>
            )
        })
    }

    function renderContent() {
        if (loading) return <Loading />
        else if (showErrorScreen) return <Error />
        else {
            return (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Motivo</th>
                                <th>Autor da denuncia</th>
                                <th>Denunciado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {renderReportTable()}
                        </tbody>
                    </table>

                    {totalReports > reports.length ? (
                        <div className="flex-row-center">
                            <button onClick={loadMoreReports} className="button-save">Carregar mais denuncias({totalReports - reports.length})</button>
                        </div>
                    ) : false}
                </>
            )
        }
    }

    return (
        <div className={styles.reportBox}>
            {renderAlertBoxOrNot()}
            <div className={styles.boxTitle}>
                <button onClick={() => {
                    setIsReportTableOpen(!isReportTableOpen);

                    Request.get(`/report?type=${type}`, localStorage.getItem("at") || "")
                        .then(resp => setReports(resp.data))
                        .catch(err => setShowErrorScreen(true))
                        .finally(() => setLoading(false));

                }}>
                    {title}
                    <span>({totalReports})</span>
                    {totalReports > 0 ? <i className={`fa ${isReportTableOpen ? "fa-angle-up" : "fa-angle-down"}`}></i> : <></>}
                </button>
            </div>

            {isReportTableOpen ? (
                <div className={styles.box}>
                    {renderContent()}
                </div>
            ) : false}

            {alertBoxProps.isOpen ? <>{renderAlertBoxOrNot()}</> : false}
        </div>
    )
}