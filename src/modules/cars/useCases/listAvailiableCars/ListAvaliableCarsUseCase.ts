import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest  {
    category_id?: string;
    brand?: string;
    name?: string;
}
@injectable()
class ListAvaliableCarsUseCase{
    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository //ICarsRepository é uma interface que é importada para ter acesso ao método findAll()
    ){}
  
    async execute({brand, category_id, name}: IRequest): Promise<Car[]> {
        const cars = await this.carRepository.findAvailable(
            brand,
            category_id,
            name
        );
        return cars;
         
    }

}export {ListAvaliableCarsUseCase}