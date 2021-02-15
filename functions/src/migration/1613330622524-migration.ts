import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1613330622524 implements MigrationInterface {
    name = 'migration1613330622524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `llamadas` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `respuestas` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `predefinidos` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `mensajes` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `emails` CHANGE `identificador` `identificador` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `emails` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `eventos` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `configuraciones` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `firebase_tokens` DROP FOREIGN KEY `FK_fcecdc68fe6b2bfcfb96ef87ddb`");
        await queryRunner.query("ALTER TABLE `firebase_tokens` CHANGE `usuario` `usuario` int NULL");
        await queryRunner.query("ALTER TABLE `firebase_tokens` ADD CONSTRAINT `FK_fcecdc68fe6b2bfcfb96ef87ddb` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `firebase_tokens` DROP FOREIGN KEY `FK_fcecdc68fe6b2bfcfb96ef87ddb`");
        await queryRunner.query("ALTER TABLE `firebase_tokens` CHANGE `usuario` `usuario` int NOT NULL");
        await queryRunner.query("ALTER TABLE `firebase_tokens` ADD CONSTRAINT `FK_fcecdc68fe6b2bfcfb96ef87ddb` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `configuraciones` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `eventos` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `emails` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `emails` CHANGE `identificador` `identificador` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `mensajes` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `predefinidos` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `respuestas` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `llamadas` CHANGE `last_update` `last_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
