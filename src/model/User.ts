export default interface User {
    id: number
    name: string
    imageUrl: string
    joinIn: string
    userType: string

    mutedTime?: number
    email?: string
    timesSilenced?: number
    warnedTimes?: number
    isBanned?: number
    isMuted: boolean;
    password?: string;
    confirmPassword?: string;
}

export interface UserLogged {
    id: number;
    name: string;
    imageUrl: string;
    isMuted: boolean;
    userType: string
    exp: number;
}