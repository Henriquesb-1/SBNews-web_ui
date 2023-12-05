"use client";

import { useState, Dispatch, SetStateAction } from "react";

import useAuthContext from "@/contextApi/hook/useAuthContext";
import Comment from "@/model/Comments";

import styles from "./commentBox.module.scss";
import UpdateOrDelete from "./UpdateOrDelete";
import Reactions from "./Reactions";
import Report from "./Report";

interface CommentListProps {
    comment: Comment;
    comments: Comment[];
    setComments: Dispatch<SetStateAction<Comment[]>>;
    newsId: number;
    isComment?: boolean;
}

export default function CommentBox({ comment, comments, setComments, newsId, isComment }: CommentListProps) {
    const [showEditBoxVisibility, setShowEditBoxVisibility] = useState<boolean>(false);

    const { user } = useAuthContext();
    const isMuted = user?.isMuted;

    return (
        <>
            <div className={styles.commentContext}>
                {showEditBoxVisibility ? (
                    <UpdateOrDelete isComment={isComment} comment={comment} comments={comments} setComments={setComments} />
                ) : <></>}

                <div className={styles.commentUserName}>
                    <img src={comment.author.imageUrl} alt={`Avatar do usuário ${comment.author.name}`} />
                    <h3>
                        <a className="clean-link" href={`/profile/${comment.author.name}`}>{comment.author.name}</a>
                    </h3>
                </div>
                <div className={styles.commentsContent}>
                    <div className={styles.commentText}>
                        <p>{comment.content}</p>
                    </div>

                    <div className={styles.commentActions}>
                        {comment.author.id === user?.id && !isMuted ? (
                            <button className={styles.commentActionsButton} onClick={() => setShowEditBoxVisibility(!showEditBoxVisibility)} title="Excluir ou editar comentário">
                                {!showEditBoxVisibility ? <i>...</i> : <i style={{ color: "#000" }}>X</i>}
                            </button>
                        ) : <></>}

                        {user && comment.author.name !== user?.name ? <Report comment={comment} newsOrigenId={2} type={isComment ? "comment" : "answer"} /> : <></>}

                    </div>
                    <div className={styles.commentComplement} style={{ justifyContent: user && !isMuted ? "" : "flex-end" }}>
                        {user && !isMuted ? <Reactions comment={comment} isComment={isComment} newsId={newsId} /> : <></>}

                        <div className={styles.datePosted}>
                            <span>{comment.datePosted}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}