import UserType from "./UserType"

export default interface User {
    id: number
    name: string
    avatar: string
    joinIn: string
    userType: UserType;

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
    avatar: string;
    isMuted: boolean;
    userType: string
    exp: number;
}