import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1738426081684 implements MigrationInterface {
	name = 'Migrations1738426081684';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`auth\` ADD \`code_verification\` int NOT NULL`);
		await queryRunner.query(
			`CREATE INDEX \`IDX_7ce84267fe75e0de0e7ff2e3ce\` ON \`auth\` (\`code_verification\`)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX \`IDX_7ce84267fe75e0de0e7ff2e3ce\` ON \`auth\``);
		await queryRunner.query(`ALTER TABLE \`auth\` DROP COLUMN \`code_verification\``);
	}
}
