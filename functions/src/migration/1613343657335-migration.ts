import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1613343657335 implements MigrationInterface {
    name = 'migration1613343657335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `firebase_tokens` DROP FOREIGN KEY `FK_fcecdc68fe6b2bfcfb96ef87ddb`");
        await queryRunner.query("ALTER TABLE `firebase_tokens` ADD CONSTRAINT `FK_fcecdc68fe6b2bfcfb96ef87ddb` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `firebase_tokens` DROP FOREIGN KEY `FK_fcecdc68fe6b2bfcfb96ef87ddb`");
        await queryRunner.query("ALTER TABLE `firebase_tokens` ADD CONSTRAINT `FK_fcecdc68fe6b2bfcfb96ef87ddb` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
