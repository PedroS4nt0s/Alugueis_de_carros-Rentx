import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddAvatar1647970859628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
             new TableColumn({
                 name: "avatar",
                 type: "varchar",
                 isNullable: true
             }))//adicionando a tabela de avatar -> migration run -> banco -> alterar clase de users
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar");
    }
}
