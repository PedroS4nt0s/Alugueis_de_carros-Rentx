/*import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase';

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    console.log("lista de categorias controller", listCategoriesUseCase)

    const categories = await listCategoriesUseCase.execute();

    console.log("lista de categorias controller execute", categories)
    return response.json(categories);
  }
}

export { ListCategoriesController };*/
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const all = await listCategoriesUseCase.execute();
    return response.json(all);
  }
}

export { ListCategoriesController };