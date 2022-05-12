import { ICreateCarsDTO } from "@modules/accounts/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository { 
    cars: Car[] = [];//array de carros

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        id,
    }: ICreateCarsDTO): Promise<Car> {//método que cria um carro
        const car = new Car(); //instancia do carro

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id,
        }); //associa os valores do DTO ao carro

        this.cars.push(car);//adiciona o carro ao array de carros

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);//retorna o carro que possui a placa informada
    }//classe que implementa a interface ICarsRepository

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string   
    ): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if (
                car.available === true ||
                ((brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name))
            ){
                return car;
            }
            return null;
        });
        return all;
    }
    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
}
export { CarsRepositoryInMemory };