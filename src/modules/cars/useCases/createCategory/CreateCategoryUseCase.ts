import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";




interface IRequest { //interface feita para o name e a description sejam reconhecidos pela class já que ela n tem acesso a categories routes
    name: string;
    description: string;
}

@injectable()//injetando dependencia 
class CreateCategoryUseCase {//criar o serviço da rota de criarCategoria | não reconhece o express (request,response) não é responsabilidade da classe 
    constructor(
        @inject("CategoriesRepository") //varedura atraves do index onde foi feito uma unica instancia para acessar o CategoriesRepository
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.
                findByName(name);//acessando com o this pois está no construtor

        if (categoryAlreadyExists) {
            throw new AppError('Category already exists')
        }

        await this.categoriesRepository.create({
            name,
            description,
        });
    }
}
export { CreateCategoryUseCase }  