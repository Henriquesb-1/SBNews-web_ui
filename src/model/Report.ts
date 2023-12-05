export interface Report {
    id: number;
    type: string;
    reason: string;
    content: string;
    newsOrigenId: number;
    author: {
        id: number;
        name: string;
    };
    reported: Reported
}

export interface Reported {
    id: number;
    name: string;
    userType?: string;
    mutedTime: number;
    warnedTimes: number;
    silencedTimes: number;
    isBanned: boolean;
};