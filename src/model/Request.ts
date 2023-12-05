import Axios from "axios";

export default class Request {

    private static baseUrl = "http://localhost:3001";

    public static async fetch(url: string, options: any) {
        return await fetch(`${this.baseUrl}${url}`, options);
    }

    public static async get(url: string, token?: string) {
        try {
            const request = await Axios.get(`${this.baseUrl}${url}`, {headers: {Authorization: `bearer ${token}`}});
            const response = request.data;
            return response; 
        } catch (error) {
            throw error;
        }

    }

    public static async post(url: string, data: any, token?: string) {
        try {
            const request = await Axios.post(`${this.baseUrl}${url}`, data, {headers: {Authorization: `bearer ${token}`}});
            return request.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }

    public static async put(url: string, data: any, token?: string) {
        try {
            const request = await Axios.put(`${this.baseUrl}${url}`, data, {headers: {Authorization: `bearer ${token}`}});
            return request.data;
        } catch (error: any) {
            throw error.response.data;
        }

        
    }

    public static async delete(url: string, token: string) {
        return Axios.delete(`${this.baseUrl}${url}`, {headers: {Authorization: `bearer ${token}`}})
    }
}