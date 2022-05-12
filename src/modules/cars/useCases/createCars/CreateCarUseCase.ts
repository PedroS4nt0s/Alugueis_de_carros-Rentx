import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest { //interface for request 
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}
@injectable() //injectable é um decorator que faz com que a classe seja injetada no container e possa ser usada em outras classes 
class  CreateCarUseCase {
    constructor(
        @inject("CarsRepository")//injeção de dependência no container
        private carsRepository: ICarsRepository) {} //injeção de dependência e
    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);//verifica se o carro já existe pela placa
        
        if(carAlreadyExists) {
            throw new AppError("Car already exists");
        }

        const car = await this.carsRepository.create({//método que cria um carro a partir do DTO e associa ao repositório que é um array de carros no in-memory
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });
        return car; 
    }
}
export { CreateCarUseCase }