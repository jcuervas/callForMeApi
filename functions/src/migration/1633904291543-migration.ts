import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1633904291543 implements MigrationInterface {
    name = 'migration1633904291543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`id_respuesta\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`id\` \`id_respuesta\` int NOT NULL AUTO_INCREMENT`);
    }

}
