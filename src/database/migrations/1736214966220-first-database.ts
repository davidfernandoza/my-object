import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstDatabase1736214966220 implements MigrationInterface {
	name = 'FirstDatabase1736214966220';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`password\` varchar(255) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`wathsapp\` varchar(15) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`verification_date\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_230c921c58f356c2847090b5e7\` (\`created_at\`), INDEX \`IDX_dff59ec323eb2f7c803b032826\` (\`deleted_at\`), UNIQUE INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` (\`email\`), UNIQUE INDEX \`IDX_71e9a129b0ab82dac0432cdf42\` (\`wathsapp\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_a3ab2926f3e068ac16ba6ab1be\` (\`created_at\`), INDEX \`IDX_ea648afc7dd92d1402daac6964\` (\`deleted_at\`), UNIQUE INDEX \`IDX_8681da666ad9699d568b3e9106\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`description\` text NULL, \`date_time\` datetime NOT NULL, \`status\` enum ('pendiente', 'aprobado', 'cancelado') NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`user_id\` int NOT NULL, \`office_id\` int NOT NULL, INDEX \`IDX_1e5804195311764dfde99a4379\` (\`title\`), INDEX \`IDX_48b267d894e32a25ebde4b207a\` (\`status\`), INDEX \`IDX_3411322e212076d1ac1a71e6ed\` (\`created_at\`), INDEX \`IDX_d6e7e8a89480ead0913f0b3dbe\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nit\` varchar(15) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`name\` varchar(150) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_b559ae26b6f801536d28109453\` (\`created_at\`), INDEX \`IDX_3b873f30fa6aaf3578d6a677a3\` (\`deleted_at\`), UNIQUE INDEX \`IDX_ed61d4dcafb6fe0f595f5e0cbd\` (\`nit\`), UNIQUE INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`item_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(80) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_d3254d9b752f6d14f2cfb2b119\` (\`created_at\`), INDEX \`IDX_1f9a9494bfa55edf85d1412e97\` (\`deleted_at\`), UNIQUE INDEX \`IDX_3398f4e6d19a6c8f40ae691641\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`identification\` varchar(50) COLLATE "utf8mb4_spanish2_ci" NULL, \`description\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`office_id\` int NOT NULL, \`user_id\` int NOT NULL, \`item_type_id\` int NOT NULL, INDEX \`IDX_213736582899b3599acaade2cd\` (\`name\`), INDEX \`IDX_ae726a7ea8f4828308ad7bc0a8\` (\`identification\`), INDEX \`IDX_02c9c7f4f86c3628ba6ec2e02b\` (\`created_at\`), INDEX \`IDX_ce829a3d8c90376de8d3a02df7\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`histories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`status\` enum ('lista de espera', 'proceso', 'finalizado', 'cancelado', 'entregado') NOT NULL, \`last_date\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`item_id\` int NOT NULL, \`employeer_id\` int NOT NULL, INDEX \`IDX_5d977bf3fcb8ca98b9dd668cda\` (\`status\`), INDEX \`IDX_557d9c2180d751a13f74d846b9\` (\`last_date\`), INDEX \`IDX_4773d74e88893e3bbe5552a5cd\` (\`created_at\`), INDEX \`IDX_f7fcb52d10481864b23c25de1c\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`employeers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(100) COLLATE "utf8mb4_spanish2_ci" NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`office_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_1472ff0394ea793b5817e21e09\` (\`code\`), INDEX \`IDX_181926d2333efcf5f689477754\` (\`status\`), INDEX \`IDX_bcc7adf879f9b1c9154629fa85\` (\`created_at\`), INDEX \`IDX_00a539afba0265de8e24252305\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`offices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(200) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`map_coordinates\` varchar(200) COLLATE "utf8mb4_spanish2_ci" NULL, \`phone_1\` varchar(20) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`phone_2\` varchar(20) COLLATE "utf8mb4_spanish2_ci" NULL, \`email_1\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`email_2\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`city_id\` int NOT NULL, \`company_id\` int NOT NULL, INDEX \`IDX_e393300483e2fd0f55add75acb\` (\`address\`), INDEX \`IDX_d5ff99df494b02d1ee614120c5\` (\`created_at\`), INDEX \`IDX_8715009d77d542e8bf700c0047\` (\`deleted_at\`), UNIQUE INDEX \`IDX_d7553c32e2dfe0c186e2991cd1\` (\`phone_1\`), UNIQUE INDEX \`IDX_4975eccd6d75aa5a9670518c72\` (\`email_1\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(60) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`department_id\` int NOT NULL, INDEX \`IDX_019a396ecfeb124a47356f5ec9\` (\`created_at\`), INDEX \`IDX_f692aa0465e3a310358fadec5b\` (\`deleted_at\`), UNIQUE INDEX \`IDX_a0ae8d83b7d32359578c486e7f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`names\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`last_names\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`identification_number\` varchar(25) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`phone\` varchar(20) COLLATE "utf8mb4_spanish2_ci" NULL, \`auth_id\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`city_id\` int NOT NULL, \`identification_type_id\` int NOT NULL, INDEX \`IDX_e465b529f6aac860fd96442ac8\` (\`names\`), INDEX \`IDX_bad68fff2dd56b25a1f4c15006\` (\`identification_number\`), INDEX \`IDX_c9b5b525a96ddc2c5647d7f7fa\` (\`created_at\`), INDEX \`IDX_073999dfec9d14522f0cf58cd6\` (\`deleted_at\`), UNIQUE INDEX \`IDX_32ddc1ae708e8261a870a6eb3e\` (\`auth_id\`), UNIQUE INDEX \`REL_32ddc1ae708e8261a870a6eb3e\` (\`auth_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`identification_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_5015ee586a3d770e4aae2821af\` (\`name\`), INDEX \`IDX_f5ac8ba80e63ad8b77dd09f875\` (\`created_at\`), INDEX \`IDX_8a3178591d3efe521043501d3b\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_64cd97487c5c42806458ab5520c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_b37cbaff19abfa4757d0f93dc54\` FOREIGN KEY (\`office_id\`) REFERENCES \`offices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_ecda4e34302c24fff0cf7345d79\` FOREIGN KEY (\`office_id\`) REFERENCES \`offices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_3b934e62fb52bac909e0ddf5422\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_93f02a9196a53d0f4b2412aa42c\` FOREIGN KEY (\`item_type_id\`) REFERENCES \`item_types\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` ADD CONSTRAINT \`FK_5d7bb6d54bfee34be45f05fa628\` FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` ADD CONSTRAINT \`FK_4313b8d46307259666475e5ff11\` FOREIGN KEY (\`employeer_id\`) REFERENCES \`employeers\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` ADD CONSTRAINT \`FK_66ec4df24e528d2194cf9ad7d18\` FOREIGN KEY (\`office_id\`) REFERENCES \`offices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` ADD CONSTRAINT \`FK_2e96ee8fdc062dba8a2adc0e886\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` ADD CONSTRAINT \`FK_75982d9cf45681affe466bd890f\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` ADD CONSTRAINT \`FK_d33767ad6bec746b339479e3396\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_2a0ffcba8da5d806b1f98454cd4\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_32ddc1ae708e8261a870a6eb3e6\` FOREIGN KEY (\`auth_id\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_03934bca2709003c5f08fd436d2\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_91aa7731aa6e62ae1303a6e5339\` FOREIGN KEY (\`identification_type_id\`) REFERENCES \`identification_types\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_91aa7731aa6e62ae1303a6e5339\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_03934bca2709003c5f08fd436d2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_32ddc1ae708e8261a870a6eb3e6\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_2a0ffcba8da5d806b1f98454cd4\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` DROP FOREIGN KEY \`FK_d33767ad6bec746b339479e3396\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` DROP FOREIGN KEY \`FK_75982d9cf45681affe466bd890f\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` DROP FOREIGN KEY \`FK_2e96ee8fdc062dba8a2adc0e886\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` DROP FOREIGN KEY \`FK_66ec4df24e528d2194cf9ad7d18\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` DROP FOREIGN KEY \`FK_4313b8d46307259666475e5ff11\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` DROP FOREIGN KEY \`FK_5d7bb6d54bfee34be45f05fa628\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_93f02a9196a53d0f4b2412aa42c\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_3b934e62fb52bac909e0ddf5422\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_ecda4e34302c24fff0cf7345d79\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_b37cbaff19abfa4757d0f93dc54\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_64cd97487c5c42806458ab5520c\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_8a3178591d3efe521043501d3b\` ON \`identification_types\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_f5ac8ba80e63ad8b77dd09f875\` ON \`identification_types\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_5015ee586a3d770e4aae2821af\` ON \`identification_types\``,
		);
		await queryRunner.query(`DROP TABLE \`identification_types\``);
		await queryRunner.query(`DROP INDEX \`REL_32ddc1ae708e8261a870a6eb3e\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_32ddc1ae708e8261a870a6eb3e\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_073999dfec9d14522f0cf58cd6\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_c9b5b525a96ddc2c5647d7f7fa\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_bad68fff2dd56b25a1f4c15006\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_e465b529f6aac860fd96442ac8\` ON \`users\``);
		await queryRunner.query(`DROP TABLE \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_a0ae8d83b7d32359578c486e7f\` ON \`cities\``);
		await queryRunner.query(`DROP INDEX \`IDX_f692aa0465e3a310358fadec5b\` ON \`cities\``);
		await queryRunner.query(`DROP INDEX \`IDX_019a396ecfeb124a47356f5ec9\` ON \`cities\``);
		await queryRunner.query(`DROP TABLE \`cities\``);
		await queryRunner.query(`DROP INDEX \`IDX_4975eccd6d75aa5a9670518c72\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_d7553c32e2dfe0c186e2991cd1\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_8715009d77d542e8bf700c0047\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_d5ff99df494b02d1ee614120c5\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_e393300483e2fd0f55add75acb\` ON \`offices\``);
		await queryRunner.query(`DROP TABLE \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_00a539afba0265de8e24252305\` ON \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_bcc7adf879f9b1c9154629fa85\` ON \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_181926d2333efcf5f689477754\` ON \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_1472ff0394ea793b5817e21e09\` ON \`employeers\``);
		await queryRunner.query(`DROP TABLE \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_f7fcb52d10481864b23c25de1c\` ON \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_4773d74e88893e3bbe5552a5cd\` ON \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_557d9c2180d751a13f74d846b9\` ON \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_5d977bf3fcb8ca98b9dd668cda\` ON \`histories\``);
		await queryRunner.query(`DROP TABLE \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_ce829a3d8c90376de8d3a02df7\` ON \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_02c9c7f4f86c3628ba6ec2e02b\` ON \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_ae726a7ea8f4828308ad7bc0a8\` ON \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_213736582899b3599acaade2cd\` ON \`items\``);
		await queryRunner.query(`DROP TABLE \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_3398f4e6d19a6c8f40ae691641\` ON \`item_types\``);
		await queryRunner.query(`DROP INDEX \`IDX_1f9a9494bfa55edf85d1412e97\` ON \`item_types\``);
		await queryRunner.query(`DROP INDEX \`IDX_d3254d9b752f6d14f2cfb2b119\` ON \`item_types\``);
		await queryRunner.query(`DROP TABLE \`item_types\``);
		await queryRunner.query(`DROP INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` ON \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_ed61d4dcafb6fe0f595f5e0cbd\` ON \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_3b873f30fa6aaf3578d6a677a3\` ON \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_b559ae26b6f801536d28109453\` ON \`companies\``);
		await queryRunner.query(`DROP TABLE \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_d6e7e8a89480ead0913f0b3dbe\` ON \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_3411322e212076d1ac1a71e6ed\` ON \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_48b267d894e32a25ebde4b207a\` ON \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_1e5804195311764dfde99a4379\` ON \`bookings\``);
		await queryRunner.query(`DROP TABLE \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_8681da666ad9699d568b3e9106\` ON \`departments\``);
		await queryRunner.query(`DROP INDEX \`IDX_ea648afc7dd92d1402daac6964\` ON \`departments\``);
		await queryRunner.query(`DROP INDEX \`IDX_a3ab2926f3e068ac16ba6ab1be\` ON \`departments\``);
		await queryRunner.query(`DROP TABLE \`departments\``);
		await queryRunner.query(`DROP INDEX \`IDX_71e9a129b0ab82dac0432cdf42\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_dff59ec323eb2f7c803b032826\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_230c921c58f356c2847090b5e7\` ON \`auth\``);
		await queryRunner.query(`DROP TABLE \`auth\``);
	}
}
