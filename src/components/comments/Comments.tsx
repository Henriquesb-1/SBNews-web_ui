"use client";

import { useState, useEffect } from "react";

import Request from "@/model/Request";
import Loading from "../template/loading/loading";
import CommentBox from "./CommentBox";
import Answers from "./Answers";
import Comment from "@/model/Comments";

import useAuthContext from "@/contextApi/hook/useAuthContext";

import styles from "./comments.module.scss";

interface CommentsProps { newsId: any }

export default function Comments({ newsId }: CommentsProps) {
    const [content, setContent] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    let [page, setPage] = useState(1);

    const { user } = useAuthContext();

    const isMuted = user?.isMuted;

    useEffect(() => {
        Request.get(`/comments?newsId=${newsId}`)
            .then(resp => setComments(resp))
            .finally(() => setLoading(false));

        Request.get(`/total?type=comment&param=${newsId}`)
            .then(resp => setTotalComments(resp));
    }, [])

    function loadMoreComments() {
        setPage(++page);

        Request.get(`/comments?newsId=${newsId}&page=${page}`)
            .then(resp => setComments(comments.concat(resp)));
    }

    function renderComments() {
        if (loading) {
            return <Loading />
        } else if (comments.length > 0) {
            return comments.map((comment, index: number) => {
                return (
                    <li className={styles.commentsGroup} key={`comment-${index}`} id={`comment-${comment.commentId}`}>
                        <CommentBox newsId={newsId} isComment comment={comment} comments={comments} setComments={setComments} />
                        <Answers commentId={comment.commentId || 0} commentIndex={index} newsId={newsId} />
                    </li>
                )
            })
        } else {
            return <h2 style={{ color: "#000" }}> Nenhum comentario postado</h2 >
        }
    }

    function post() {
        const date = new Date()
        const datePosted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        Request.post("/comments", { content, newsId, author: { id: user?.id }, datePosted }, localStorage.getItem("at") || "")
            .then(resp => {
                const newComment: Comment = {
                    commentId: 0,
                    content,
                    datePosted,
                    author: {
                        id: user?.id || 0,
                        name: user?.name || "",
                        imageUrl: user?.avatar || ""
                    },
                    reactions: {
                        agreeCount: 0,
                        disagreeCount: 0
                    }
                }

                setContent("");
                setComments(comments.concat(newComment));
            });
    }

    const saveLastLocation = () => {
        localStorage.removeItem("last_location")
        localStorage.setItem("last_location", window.location.href)
    }

    return (
        <>
            <h2 style={{ fontSize: "1.1em" }} > Comentarios({totalComments})</h2 >

            <div className={styles.commentTextArea}>
                <div className={styles.commentsInput}>
                    {user ? (
                        <>
                            <div className={styles.commentUserText} id="comment-box">
                                <img src={user?.avatar} alt="User Image" />
                                <textarea placeholder={isMuted ? "Parece que sua conta foi silenciada, você poderá voltar a partipar em breve" : "Comente sua opinião, criticas, etc..."}
                                    disabled={isMuted} value={content} onChange={e => setContent(e.target.value)} maxLength={1024}>
                                </textarea>
                            </div>

                            {!isMuted ? (
                                <div className={styles.postCommentsAction}>
                                    <button className="button-save" onClick={post}>Publicar</button>
                                    <button className="cancel-button" onClick={() => setContent("")}>Cancelar</button>
                                </div>
                            ) : <></>}
                        </>
                    ) : (
                        <h3 style={{ color: "#000" }}>
                            Faça
                            <a href="/auth/signIn" onClick={() => saveLastLocation()}> login </a> ou
                            <a href="/auth/signUp" onClick={() => saveLastLocation()}> cadastro </a>
                            para comentar
                        </h3>
                    )}
                </div>
            </div>

            <ul className={styles.allComments}>
                {renderComments()}

                {totalComments > comments.length ? (
                    <div>
                        <button className="load-more-button button-save" onClick={loadMoreComments}>Mais comentarios({totalComments - comments.length})</button>
                    </div>
                ) : false}

            </ul>
        </>
    )
}