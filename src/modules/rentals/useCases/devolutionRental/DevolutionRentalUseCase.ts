import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rentals";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository") //são os Repositories das classes que a classe DevolutionRentalUseCase vai depender.
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carRepository: ICarsRepository,
    ) { };

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental not found");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays( //verificação sda diaria, quantos dias o carro foi alugado
            rental.start_date,
            this.dateProvider
            .dateNow()
        );

        if (daily <= 0) {//se a diaria for menor ou igual a zero, atribuimos o valor minimo de dias
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(//verificando se teve atraso na devolução
            dateNow,
            rental.expected_return_date,
        );
 
        let total = 0;
        
        if (delay > 0) { //calculando dias de atraso
            const calculate_fine = delay * car.fine_amount; //calculando o valor da multa
            total = calculate_fine
        }

        total += daily * car.daily_rate;// somando o valor da diaria com o valor da multa


        //atualização de status do aluguel
        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };