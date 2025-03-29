import { MigrationInterface, QueryRunner } from 'typeorm';

export class Second1743278619689 implements MigrationInterface {
	name = 'Second1743278619689';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_373ead146f110f04dad60848154\``,
		);
		await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`userId\` \`userId\` int NULL`);
		await queryRunner.query(
			`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_373ead146f110f04dad60848154\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_373ead146f110f04dad60848154\``,
		);
		await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`userId\` \`userId\` int NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_373ead146f110f04dad60848154\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
	}
}
