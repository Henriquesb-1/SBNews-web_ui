import { Dispatch, SetStateAction } from "react";
import Request from "@/model/Request";

export default class FileUpload {

    public static async upload(file: Blob, paramName: string, fileName: string, uploadUrl: string) {
        const formData = new FormData();
        formData.append(paramName, file, fileName);

        try {
            Request.post(uploadUrl, formData);
        } catch (error) {
            throw error;
        }
    }

    public static prepareImageToUpload(imageInput: any, imageName: string, setImage: Dispatch<SetStateAction<any>>) {
        const file = imageInput.files[0];
        const imageFormat = file.type.split("/")[1];
        const name = `${imageName}-${Date.now()}-${Math.random() * 1000}.${imageFormat}`;
        setImage({file, name});
    }
}