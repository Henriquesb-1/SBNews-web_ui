export default interface Notification {
    id: number;
    type: string;
    content: string;
    newsOrigen: {
        id: number;
        title: string;
    };
    hasBeenRead: boolean;
    causedBy: {
        id: number;
        name: string;
    },
    userTarget: {
        id: number;
        name: string;
    }
}