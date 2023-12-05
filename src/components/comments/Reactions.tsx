import React, { useState, useEffect } from "react";

import agree from "../../assets/agree.svg";
import disagree from "../../assets/disagree.svg";
import agreeActive from "../../assets/agree-active.svg";
import disagreeActive from "../../assets/disagree-active.svg";

import Comment from "@/model/Comments";
import useAuthContext from "@/contextApi/hook/useAuthContext";
import Request from "@/model/Request";
import { UserLogged } from "@/model/User";

import styles from "./reactions.module.scss";
import { Reaction } from "@/model/Reaction";

interface CommentsReactionsProps {
    comment: Comment;
    isComment?: boolean;
    newsId: number;
}

interface previousUserReaction {
    hasAlreadyReacted: boolean
    agreeOrDisagree: string
}

export default function Reactions({ comment, isComment, newsId }: CommentsReactionsProps) {
    const [agreeCount, setAgreeCount] = useState<number>(0);
    const [disagreeCount, setDisagreeCount] = useState<number>(0);

    const [previousUserReaction, setPreviousUserReaction] = useState<previousUserReaction>({ hasAlreadyReacted: false, agreeOrDisagree: "" });

    const [agreeImgSRC, setAgreeImgSRC] = useState<any>(agree.src);
    const [disagreeImgSRC, setDisagreeImgSRC] = useState<any>(disagree.src);

    const { user } = useAuthContext();

    useEffect(() => {
        const userToken = localStorage.getItem("at") || "";

        if (userToken) {
            const userLogged: Promise<UserLogged> = Request.get("/users/auth", userToken).then(resp => resp);
            userLogged.then(user => alreadyReacted(user));

            function alreadyReacted(user: UserLogged) {
                Request.get(`/reactions?userId=${user.id}&type=${isComment ? "comment" : "answer"}`, userToken)
                    .then(resp => {
                        resp.map((res: Reaction) => {
                            if (res.commentId === comment.commentId || res.commentId === comment.answerId) {
                                setPreviousUserReaction({ hasAlreadyReacted: true, agreeOrDisagree: res.agreeOrDisagree });
                                res.agreeOrDisagree == "agree" ? setAgreeImgSRC(agreeActive.src) : setDisagreeImgSRC(disagreeActive.src);
                            };
                        });
                    })
            }
        }

    }, [])

    useEffect(() => {
        setAgreeCount(comment.reactions.agreeCount);
        setDisagreeCount(comment.reactions.disagreeCount);
    }, []);

    function handleReaction(agreeOrDisagree: string) {
        const isAgree = agreeOrDisagree === "agree";
        const userToken = localStorage.getItem("at") || "";

        const data = {
            reaction: {
                agreeOrDisagree,
                causedBy: user?.id,
                commentId: isComment ? comment.commentId : comment.answerId,
                userTarget: comment.author.id,
                newsId
            },
            agreeCount: 0,
            disagreeCount: 0,
            type: isComment ? "comment" : "answer",
            willRemoveReaction: false,
            willChangeReaction: false
        }

        if (previousUserReaction.hasAlreadyReacted) {
            if (previousUserReaction.agreeOrDisagree === agreeOrDisagree) {
                //Will delete reaction...
                if (isAgree) {
                    setAgreeCount(agreeCount - 1);
                    data.agreeCount = agreeCount - 1;
                    setAgreeImgSRC(agree.src);
                } else {
                    setDisagreeCount(disagreeCount - 1);
                    data.disagreeCount = disagreeCount - 1;
                    setDisagreeImgSRC(disagree.src);
                }

                setPreviousUserReaction({ agreeOrDisagree: "", hasAlreadyReacted: false });
                data.willRemoveReaction = true;
            } else {
                //Will change reaction...
                if (isAgree) {
                    setAgreeCount(agreeCount + 1);
                    setDisagreeCount(disagreeCount - 1);
                    data.agreeCount = agreeCount + 1;
                    data.disagreeCount = disagreeCount - 1;
                    setAgreeImgSRC(agreeActive.src);
                    setDisagreeImgSRC(disagree.src);
                } else {
                    setAgreeCount(agreeCount - 1);
                    setDisagreeCount(disagreeCount + 1);
                    data.agreeCount = agreeCount - 1;
                    data.disagreeCount = disagreeCount + 1;
                    setDisagreeImgSRC(disagreeActive.src);
                    setAgreeImgSRC(agree.src)
                }

                setPreviousUserReaction({ agreeOrDisagree: agreeOrDisagree, hasAlreadyReacted: true });
                data.willChangeReaction = true;
            }
        } else {
            //Will insert a new reaction...
            if (isAgree) {
                setAgreeCount(agreeCount + 1);
                data.agreeCount = agreeCount + 1;
                setAgreeImgSRC(agreeActive.src);
            } else {
                setDisagreeCount(disagreeCount + 1);
                data.disagreeCount = disagreeCount + 1;
                setDisagreeImgSRC(disagreeActive.src);
            }

            setPreviousUserReaction({ agreeOrDisagree: agreeOrDisagree, hasAlreadyReacted: true });
        }

        Request.post("/reactions", { ...data }, userToken);
    };

    return (
        <div className={styles.reactionButtons}>
            <button onClick={() => handleReaction("agree")}>
                <img src={agreeImgSRC} title="Concordo" alt="Botão que representa concordancia" />
                <span>{agreeCount}</span>
            </button>
            <button onClick={() => handleReaction("disagree")}>
                <img src={disagreeImgSRC} title="Não concordo" alt="Botão que representa não concordancia" />
                <span>{disagreeCount}</span>
            </button>
        </div>
    )
}