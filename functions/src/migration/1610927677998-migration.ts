import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1610927677998 implements MigrationInterface {
    name = 'migration1610927677998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `confirmation_token` DROP FOREIGN KEY `FK_b2856176835b36479dd9ebd475f`");
        await queryRunner.query("ALTER TABLE `confirmation_token` CHANGE `usuarioIdUsuario` `usuario` int NULL");
        await queryRunner.query("ALTER TABLE `confirmation_token` ADD CONSTRAINT `FK_274acf6138634adf950c6593823` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `confirmation_token` DROP FOREIGN KEY `FK_274acf6138634adf950c6593823`");
        await queryRunner.query("ALTER TABLE `confirmation_token` CHANGE `usuario` `usuarioIdUsuario` int NULL");
        await queryRunner.query("ALTER TABLE `confirmation_token` ADD CONSTRAINT `FK_b2856176835b36479dd9ebd475f` FOREIGN KEY (`usuarioIdUsuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
