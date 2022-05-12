import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/containers/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { DevolutionRentalUseCase } from "../devolutionRental/DevolutionRentalUseCase";
import { CreateRentalsUseCase } from "./CreateRentalUseCase";


let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: IDateProvider;



describe("Create Rentals", () => {  // 1-Descrevere o teste
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {// 2-Criar o contexto do teste


        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider(); // 3-Criar o repositorio a ser injetado
        createRentalsUseCase = new CreateRentalsUseCase
            (
                rentalsRepositoryInMemory,
                dayjsDateProvider,
                carsRepositoryInMemory,
            );// 4-Criar o objeto a ser testado

    });

    it("should be able create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Fusca da Ford",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "Ford",

        });

        const rental = await createRentalsUseCase.execute({
            user_id: "123456",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });
        //console.log(rental);
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able create a new rental if there is another open to the same user ", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "123456",
        });

        await expect(
            createRentalsUseCase.execute({
                user_id: "123456",
                car_id: "121212",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("There's a rental open to this user"));
    });

    it("should be able create a new rental if there is another open to the same car ", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "123456",
        });

        await expect(
            createRentalsUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should be able create a new rental with invalid time ", async () => {
        await expect(createRentalsUseCase.execute({
            user_id: "123",
            car_id: "test",
            expected_return_date: dayjs().toDate()
        })
        ).rejects.toEqual(new AppError("The rental must be at least 24 hours"));
    });
});