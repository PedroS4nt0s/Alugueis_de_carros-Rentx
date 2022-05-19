import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {

    beforeEach(() => {//beforeEach é um método que é executado antes de cada teste serve para inicializar algumas variáveis e objetos
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);//ListCarsUseCase recebe como parâmetro o CarsRepositoryInMemory para que ele possa acessar o método findAll()
    });

    it("should be able list all available cars", async () => {// () => é um arrow function que retorna uma promise
        const car = await carsRepositoryInMemory.create({
            name: "Fusca1",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            brand: "VW",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('shoulde be able list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca2",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            brand: "VW_test",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "VW_test",
        });
        
        expect(cars).toEqual([car]);
    });

    it('shoulde be able list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca3",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC-1235",
            fine_amount: 10,
            brand: "VW_test",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: "Fusca3",
        });
       
        expect(cars).toEqual([car]);
    });

    it('shoulde be able list all available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca4",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC-1235",
            fine_amount: 10,
            brand: "VW_test",
            category_id: "12345",
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
       
        expect(cars).toEqual([car]);
    });
});
