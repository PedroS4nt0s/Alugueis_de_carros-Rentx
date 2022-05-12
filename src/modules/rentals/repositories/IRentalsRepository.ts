import { Rental } from "../infra/typeorm/entities/Rentals";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";

//implementar os metodos presentes no CreateRentalsUseCase.TS
interface IRentalsRepository {

    create(date: ICreateRentalDTO): Promise<Rental>;
    findOpenRentalById(car_id:string):Promise<Rental>
    findOpenRentalByUserId(user_id:string):Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>
}
export {IRentalsRepository}