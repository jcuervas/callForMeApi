import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1610923034882 implements MigrationInterface {
    name = 'migration1610923034882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `fecha_alta` `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `fecha_alta` `fecha_alta` datetime NOT NULL");
    }

}
