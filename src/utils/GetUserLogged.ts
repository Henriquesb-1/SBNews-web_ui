import Request from "@/model/Request";

export default async function getUserLogged() {
    const token = localStorage.getItem("at") || "";
    return Request.get("/users/auth", token);
}