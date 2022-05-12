import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rentals";

class RentalsRepository implements IRentalsRepository {

	private repository: Repository<Rental>;

	constructor() {
		this.repository = getRepository(Rental);
	}

	async findOpenRentalById(car_id: string): Promise<Rental> {
		const openByCar = this.repository.findOne({
			where: { car_id, end_date: null }
		});
		return openByCar
	}

	async findOpenRentalByUserId(user_id: string): Promise<Rental> {
		const openByUser = this.repository.findOne({
			where: { user_id, end_date: null }
		});
		return openByUser
	}

	async create({
		car_id,
		user_id,
		expected_return_date,
		id,
		end_date,
		total,
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create({
			car_id,
			user_id,
			expected_return_date,
			id,
			end_date,
			total,
		});
		await this.repository.save(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		const rental = await this.repository.findOne(id);

		return rental;
	}

	async findByUser(user_id: string): Promise<Rental[]> {
		const rentals = await this.repository.find({
			where: { user_id },
			relations: ["car"]//fazendo o relacionamento entre as tabelas olhar na entity rentals se houver duvida
		});

		return rentals;
	}
}
export { RentalsRepository };