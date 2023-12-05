import { useState, useEffect, memo } from "react";

import useAuthContext from "@/contextApi/hook/useAuthContext";

import Request from "@/model/Request";
import Comment from "@/model/Comments";
import CommentBox from "./CommentBox";

import styles from "./answers.module.scss";
import Loading from "../template/loading/loading";

import postIcon from "../../assets/postIcon.svg";
import FeedBack from "@/utils/FeedBack";
import User from "@/model/User";

interface AnswersProps {
    commentId: number;
    commentIndex: number;
    newsId: number;
}

function Answers({ commentId, commentIndex, newsId }: AnswersProps) {
    const [seeAnswers, setSeeAnswers] = useState<boolean>(false);

    const [answers, setAnswers] = useState<Comment[]>([]);
    const [totalAnswers, setTotalAnswers] = useState<number>(0);
    const [userTagged, setUserTagged] = useState<User>();

    let [page, setPage] = useState<number>(1);
    const [content, setContent] = useState<string>("");
    const [lastAnswerReceive] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { user } = useAuthContext();

    useEffect(() => {
        Request.get(`/total?type=answer&param=${commentId}`)
            .then(resp => setTotalAnswers(resp));
    }, []);

    function loadMoreAnswers() {
        setPage(++page);

        Request.get(`/answers?commentId=${commentId}&page=${page}`)
            .then(resp => setAnswers(answers.concat(resp)));
    }

    function post() {
        const date = new Date();
        const datePosted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        Request.post("/answers", { content: userTagged ? userTagged.name + content : content, author: { id: user?.id, name: user?.name }, commentId, newsId, datePosted, userTagged }, localStorage.getItem("at") || "")
            .then(resp => {
                const newAnswer = {
                    answerId: resp,
                    author: {
                        id: user?.id || 0,
                        name: user?.name || "",
                        imageUrl: user?.imageUrl || ""
                    },
                    commentId,
                    content: userTagged ? userTagged.name + content : content,
                    datePosted,
                    reactions: {
                        agreeCount: 0,
                        disagreeCount: 0
                    }
                }

                setAnswers(answers.concat(newAnswer));
                setContent("");
            })
            .catch(err => FeedBack.error(err));
    }

    function renderAnswers() {
        if (seeAnswers) {
            if (!lastAnswerReceive.includes(commentIndex)) {
                lastAnswerReceive.push(commentIndex)
                Request.get(`/answers?commentId=${commentId}&page=${page}`)
                    .then(resp => setAnswers(resp))
                    .finally(() => setLoading(false));
            }

            if (loading) {
                return <Loading />
            } else {
                return answers.map((answer, index: number) => {
                    return (
                        <li className={`${styles.answer} margin-y`} style={{cursor: user ? "pointer" : "default"}} id={`answer-${answer.answerId}`} key={`answer-${index}`} title={user ? `Responder comentário de ${answer.author.name}` : `Resposta de ${answer.author.name}`} onClick={e => tagUserAndPostAnswer(answer)}>
                            <CommentBox comment={answer} comments={answers} setComments={setAnswers} newsId={newsId} />
                        </li>
                    )
                })
            }
        }
    }

    function tagUserAndPostAnswer(answer: Comment) {
        const user: User = {
            id: answer.author.id,
            name: answer.author.name,
            imageUrl: answer.author.imageUrl,
            joinIn: "",
            userType: "",
            isMuted: false
        }
        setUserTagged(user);
        setContent(answer.author.name + " - ");
    }

    return (
        <>
            <div className={styles.seeAnswers} >
                <button onClick={() => setSeeAnswers(!seeAnswers)}>Respostas ({totalAnswers})</button>
            </div>

            <ul className={seeAnswers ? styles.answers : styles.hideAnswers} id={`element-${commentIndex}`}>
                {renderAnswers()}

                {totalAnswers > answers.length ? (
                    <div>
                        <button className="load-more-button button-save" onClick={loadMoreAnswers}>Mais respostas({totalAnswers - answers.length})</button>
                    </div>
                ) : <></>}

                {user && !user?.isMuted ? (
                    <div className={styles.answerInput} id="answer-box">
                        <div className={styles.answerText}>
                            <textarea placeholder="Participe" value={content} onChange={e => setContent(e.target.value)} />
                        </div>

                        <div className={styles.postButton}>
                            <button onClick={post} title="Responder">
                                <img src={postIcon.src} />
                            </button>
                        </div>
                    </div>
                ) : <></>}
            </ul>
        </>
    )
}

export default memo(Answers)