import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Request from "@/model/Request";

import Comment from "@/model/Comments";
import FeedBack from "@/utils/FeedBack";

import styles from "./updateOrDelete.module.scss";

interface UpdateOrDeleteCommentProps {
    comments: Comment[];
    setComments: Dispatch<SetStateAction<Comment[]>>;
    comment: Comment;
    isComment?: boolean;
}

export default function UpdateOrDelete({ comment, comments, setComments, isComment }: UpdateOrDeleteCommentProps) {
    const [commentId, setCommentId] = useState<number>(0);
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        isComment ? setCommentId(comment.commentId) : setCommentId(comment.answerId || 0);
        setContent(comment.content);
    }, [])

    function save() {
        const url = isComment ? "/comments" : "/answers";


        Request.put(url, { commentId, content, answerId: commentId }, localStorage.getItem("at") || "")
            .then(resp => {
                FeedBack.success("Comentário salvo");

                const updatedComments = comments.map(comment => {
                    if (comment.commentId === commentId || comment.answerId === commentId) {
                        comment.content = content;
                    }
                    return comment;
                });

                setComments(updatedComments);
            })
            .catch(err => FeedBack.error("Não foi possivel editar comentário"));

    }

    function deleteComment() {
        const url = isComment ? "/comments" : "/answers";

        Request.delete(`${url}/${commentId}`, localStorage.getItem("at") || "")
            .then(resp => {
                FeedBack.success("Comentário excluído");
                const removeDeleteComment = comments.filter(comment => comment.commentId !== commentId || comment.answerId !== commentId);
                setComments(removeDeleteComment);
            })
            .catch(err => FeedBack.error("Não foi possivel excluir comentário"));
    }

    return (
        <div className={styles.editCommentBox}>
            <div className={styles.editBox}>
                <textarea name="comment-to-delete-or-edit" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <button className="button-save" onClick={save}>Salvar</button>
            <button className="cancel-button" onClick={deleteComment}>Excluir Comentário</button>
        </div>
    )
}