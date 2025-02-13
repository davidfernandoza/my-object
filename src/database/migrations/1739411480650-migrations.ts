import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739411480650 implements MigrationInterface {
    name = 'Migrations1739411480650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth\` ADD \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth\` DROP COLUMN \`refresh_token\``);
    }

}
