"use client";

import Request from "@/model/Request";
import User from "@/model/User";
import FeedBack from "@/utils/FeedBack";
import FileUpload from "@/utils/FileUpload";
import { createContext, useEffect, useState } from "react";

interface UserContextProps {
    user: User | undefined;
    logIn(name: string, password: string): void;
    signUp(name: string, email: string, password: string, confirmPassword: string, profileImage: string): void;
    logOut(): void;
}

const AuthContext = createContext<UserContextProps>({
    user: undefined,
    logIn: () => { },
    signUp: () => { },
    logOut: () => { }
})

export function AuthProvider(props: any) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const at = localStorage.getItem("at");

        if (at) {
            Request.get("/users/auth", at)
                .then(resp => setUser(resp))
                .catch(err => {});
        }
    }, [])

    function signUp(name: string, email: string, password: string, confirmPassword: string, profileImage: any) {
        const date = new Date();
        const joinIn = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const joinInTime = Math.floor(Date.now() / 1000);

        const imageUrl = profileImage ? `http://localhost:3001/userAvatar/${profileImage.name}` : "";

        Request.post("/users", { name, email, password, confirmPassword, joinIn, imageUrl, joinInTime })
            .then(resp => {
                setTimeout(() => location.reload(), 3000);
                if (profileImage) FileUpload.upload(profileImage.file, "userImage", profileImage.name, "/users/upload");
                FeedBack.success("Cadastro realizado com sucesso");
            })
            .catch(err => console.log(err));
    }

    function logIn(name: string, password: string) {
        Request.post("/users/auth", { name, password })
            .then(resp => {
                const lastLocation = localStorage.getItem("last_location");
                window.location.replace(lastLocation || "/");

                localStorage.setItem("at", resp);
            })
            .catch(err => FeedBack.error(err));
    }

    function logOut() {
        localStorage.removeItem("at");
        location.reload();
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;