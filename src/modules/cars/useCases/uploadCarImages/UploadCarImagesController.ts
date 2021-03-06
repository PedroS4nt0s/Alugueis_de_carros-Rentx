import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles{
    filename:string;
}

class UploadCarImagesController{
    async handle(request: Request, response: Response){
        const {id} = request.params; //requesr.params é um objeto que contem todos os parametros da rota
        const images = request.files as IFiles[]; //request.files é um array de objetos que contem todos os arquivos enviados

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        const images_name = images.map((file) => file.filename);

        await   uploadCarImagesUseCase.execute({
            car_id: id,
            images_name,
        });

        return response.status(200).send();
    }

}
export { UploadCarImagesController };