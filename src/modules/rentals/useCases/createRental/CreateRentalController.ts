import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalsUseCase } from "./CreateRentalUseCase";


class CreateRentalController {
    async handle(request:Request, response:Response ): Promise<Response> {
        const { expected_return_date, car_id} =  request.body;//
        const {id} = request.user;

        const createRentalUseCase = container.resolve(CreateRentalsUseCase);// container serve para injetar dependencia

        const rental = await createRentalUseCase.execute({
            car_id,
            expected_return_date,
            user_id: id,
        });
        return response.status(200).json(rental);   
    }
}
export { CreateRentalController }