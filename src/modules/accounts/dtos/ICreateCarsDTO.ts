import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateCarsDTO {//interface para o DTO
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    id?: string;
    specifications?: Specification[];
}
export { ICreateCarsDTO };