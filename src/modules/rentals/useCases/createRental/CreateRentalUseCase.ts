import dayjs from "dayjs";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rentals";


interface IRequest { // 1- criar a interface para o request do teste
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carRepository: ICarsRepository,

        ) { }//2- criar o construtor para injetar o repositorio e fazer a injeção de dependencia

    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> { //3- criar o metodo execute para receber o request e fazer a injeção de dependencia
        const minimumHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalById(car_id);

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }
        const rentalsOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);

        if (rentalsOpenToUser) {
            throw new AppError("There's a rental open to this user");
        }
        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date, 
            );

        if (compare < minimumHour) {
            throw new AppError("The rental must be at least 24 hours");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });
        await this.carRepository.updateAvailable(car_id, false);

        return rental;
    }


}
export { CreateRentalsUseCase }