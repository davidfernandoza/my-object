import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAuthTable1736216322729 implements MigrationInterface {
	name = 'AlterAuthTable1736216322729';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`auth\` CHANGE \`verification_date\` \`verification_date\` datetime NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`auth\` CHANGE \`verification_date\` \`verification_date\` datetime NOT NULL`,
		);
	}
}
