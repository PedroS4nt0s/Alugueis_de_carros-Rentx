import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory; //parei aqui 10:31 min

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a new category", async () => {//é um void   
        const category = {
            name: "category test",
            description: "category test description",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );
        expect(categoryCreated).toHaveProperty("id");
    });
    //---------------------------------------------------------------------------------
    it("Should not be able to create a category with name exists", async () => {//é um void   
        const category = {
            name: "category test",
            description: "category test description",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        
        await expect( 
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        ).rejects.toEqual(new AppError("Category already exists"));
    });
});