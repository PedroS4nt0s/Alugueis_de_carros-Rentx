import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase:CreateCarSpecificationUseCase
let carsRepositoryInMemory:CarsRepositoryInMemory
let specificationRepositoryInMemory:SpecificationsRepositoryInMemory

describe('CreateCarSpecificationUseCase', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();   
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory,
        );
    })

    it('should not be able  to add a new specification to a now-existent car',async  () => {
        const car_id = "1234";
        const specification_id = ["54321"];

        await expect(createCarSpecificationUseCase.execute({
             car_id,
             specification_id,
           })
        ).rejects.toEqual(new AppError("Car does not Exists"));
    });

    it('should be able  to add a new specification to the car',async  () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            brand: "VW",
            category_id: "1",
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test", 
            description: "test",
        });

        const specification_id = [specification.id];

        const specificationCars = await createCarSpecificationUseCase.execute({
             car_id: car.id,
            specification_id
        });

        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    });
});
