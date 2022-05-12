
import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";



const categoriesRoutes = Router(); //dentro do tipo router já possuimos os tipos request e response 

const upload = multer({
    dest: "./tmp",
});
//nao especificamos os tipos do request e response nos arquivos de routas
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle);
//O createCategoryController vai funcionar como um middleware pois ele ja tem o request e response para criar a categoria

categoriesRoutes.get("/", listCategoriesController.handle); //


categoriesRoutes.post("/import", upload.single("file"));

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    importCategoryController.handle
);

export { categoriesRoutes };