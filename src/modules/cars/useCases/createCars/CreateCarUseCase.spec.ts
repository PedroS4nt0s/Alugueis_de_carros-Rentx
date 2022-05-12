import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";



let createCarUseCase: CreateCarUseCase;//instancia do use case
let carsRepositoryInMemory: CarsRepositoryInMemory;//instancia do repositório

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();//instancia do repositório
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);//injeção de dependência
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Fusca",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            brand: "VW",
            category_id: "1",
        });
        expect(car).toHaveProperty("id");
    });

    it('shoulde not be able to create a new car with exists license plate', async () =>     {
        await createCarUseCase.execute({
            name: 'Name car',
            description: 'Decription',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        });
        
        await expect(createCarUseCase.execute({
            name: 'Name car',
            description: 'Decription',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        })
        ).rejects.toEqual(new AppError("Car already exists")); //expect(fn().constructor.name).toBe('Promise')
    });

    it('shoulde not be able to create a new car with available = true by default', async () => {
       const car = await createCarUseCase.execute({
          name: 'Car Available',
          description: 'Description',
          daily_rate: 100,
          license_plate: 'ABC-1234',
          fine_amount: 60,
          brand: 'Brand',
          category_id: 'Category',
        });
       // console.log(car);
    expect(car.available).toBe(true);
  });
}); 