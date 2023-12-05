export default interface Comment {
    content: string,
    datePosted: string,
    commentId: number,
    answerId?: number,
    author: {
        id: number,
        name: string,
        imageUrl: string
    },
    reactions: {
        agreeCount: number,
        disagreeCount: number
    }
}