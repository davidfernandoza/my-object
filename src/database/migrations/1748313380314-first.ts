import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1748313380314 implements MigrationInterface {
	name = 'First1748313380314';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`authTokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(512) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`type\` enum ('JWT[BlackAccessToken]', 'JWT[RefreshToken]', 'Oauth[ApiKey]', 'Oauth[Token]', '2FA[APiKey]', '2FA[Token]', 'VerificationEmail[ApiKey]', 'VerificationEmail[Token]', 'passwordReset[ApiKey]', 'passwordReset[Token]') NOT NULL, \`expiration\` datetime NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`authId\` int NOT NULL, INDEX \`IDX_a4bb826ae909a57a73b4a7f6e1\` (\`type\`), INDEX \`IDX_170a56979ec2ef0b345441562e\` (\`createdAt\`), INDEX \`IDX_209c38a354840ba0c8e19ac97b\` (\`deletedAt\`), UNIQUE INDEX \`IDX_fd6ffe8e265b858cddbd58baa7\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`password\` varchar(255) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`passwordExpirationDate\` datetime NOT NULL, \`loginAttempts\` int NOT NULL DEFAULT '0', \`loginAttemptsExpiration\` datetime NULL, \`loginAttemptsCicles\` int NOT NULL DEFAULT '0', \`verificationEmailDate\` datetime NULL, \`with2FA\` tinyint NOT NULL DEFAULT 0, \`secret2FA\` varchar(255) COLLATE "utf8mb4_spanish2_ci" NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`userId\` int NULL, INDEX \`IDX_995f4fd7591db88faf612690b7\` (\`loginAttempts\`), INDEX \`IDX_36169bd5294fc4e10cf1a9dc70\` (\`secret2FA\`), INDEX \`IDX_392eca727f7ab94f76fe3d687f\` (\`createdAt\`), INDEX \`IDX_3a7a2ac1831ef351d76eee1c29\` (\`deletedAt\`), UNIQUE INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, INDEX \`IDX_3cc6e9e64e9a12d16dd009c4c2\` (\`createdAt\`), INDEX \`IDX_7644d3260b6315613b4cfe27bf\` (\`deletedAt\`), UNIQUE INDEX \`IDX_8681da666ad9699d568b3e9106\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`description\` text NULL, \`dateTime\` datetime NOT NULL, \`status\` enum ('pendiente', 'aprobado', 'cancelado') NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`userId\` int NOT NULL, \`officeId\` int NOT NULL, INDEX \`IDX_1e5804195311764dfde99a4379\` (\`title\`), INDEX \`IDX_48b267d894e32a25ebde4b207a\` (\`status\`), INDEX \`IDX_9e6c6f77fef0901245aa9532e1\` (\`createdAt\`), INDEX \`IDX_1481cb05f929015e6bbb257c25\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nit\` varchar(15) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`name\` varchar(150) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, INDEX \`IDX_a0365502b055164bc8234ae6ff\` (\`createdAt\`), INDEX \`IDX_f5b48fd28eefb26ad91ec8fd12\` (\`deletedAt\`), UNIQUE INDEX \`IDX_ed61d4dcafb6fe0f595f5e0cbd\` (\`nit\`), UNIQUE INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`itemTypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(80) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, INDEX \`IDX_9f146fa5a42577606e98cf7cb4\` (\`createdAt\`), INDEX \`IDX_aa8b136c7e2d450827c74ddd73\` (\`deletedAt\`), UNIQUE INDEX \`IDX_6984ec8fc43755ec86b6fe7383\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`identification\` varchar(50) COLLATE "utf8mb4_spanish2_ci" NULL, \`description\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`officeId\` int NOT NULL, \`userId\` int NOT NULL, \`itemTypeId\` int NOT NULL, INDEX \`IDX_213736582899b3599acaade2cd\` (\`name\`), INDEX \`IDX_ae726a7ea8f4828308ad7bc0a8\` (\`identification\`), INDEX \`IDX_7d4398587e942a1b2bb93b91e1\` (\`createdAt\`), INDEX \`IDX_3844a75711aeaa1cf882b4be73\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`histories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`status\` enum ('lista de espera', 'proceso', 'finalizado', 'cancelado', 'entregado') NOT NULL, \`lastDate\` datetime NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`itemId\` int NOT NULL, \`employeerId\` int NOT NULL, INDEX \`IDX_5d977bf3fcb8ca98b9dd668cda\` (\`status\`), INDEX \`IDX_9fc84ef7e736ff929bc8fb2a3a\` (\`lastDate\`), INDEX \`IDX_1fda56ccf8714b0554f19629e1\` (\`createdAt\`), INDEX \`IDX_c892fefe7ee51d19c8e625d803\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`employeers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(100) COLLATE "utf8mb4_spanish2_ci" NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`officeId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_1472ff0394ea793b5817e21e09\` (\`code\`), INDEX \`IDX_181926d2333efcf5f689477754\` (\`status\`), INDEX \`IDX_359acdae32c7c9a1427fd25738\` (\`createdAt\`), INDEX \`IDX_a1b1eb7049c9f1efccaf67c289\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`offices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(200) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`mapCoordinates\` varchar(200) COLLATE "utf8mb4_spanish2_ci" NULL, \`phone1\` varchar(20) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`phone2\` varchar(20) COLLATE "utf8mb4_spanish2_ci" NULL, \`email1\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`email2\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`city_id\` int NOT NULL, \`companyId\` int NOT NULL, INDEX \`IDX_e393300483e2fd0f55add75acb\` (\`address\`), INDEX \`IDX_0a7f7da1323396b5ccd120119c\` (\`createdAt\`), INDEX \`IDX_f631d07cc9a03cc06dc96e3060\` (\`deletedAt\`), UNIQUE INDEX \`IDX_83e74d1ab13c491ecd1e60adb0\` (\`phone1\`), UNIQUE INDEX \`IDX_0cae4828de60f787328045c7ba\` (\`email1\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(60) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`departmentId\` int NOT NULL, INDEX \`IDX_9f8debfe7080ceb81f972d8150\` (\`createdAt\`), INDEX \`IDX_87cb809d3c82eda5cd4d16f98d\` (\`deletedAt\`), UNIQUE INDEX \`IDX_a0ae8d83b7d32359578c486e7f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`identification_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, INDEX \`IDX_5015ee586a3d770e4aae2821af\` (\`name\`), INDEX \`IDX_ba50aa7772cc5758860e26d045\` (\`createdAt\`), INDEX \`IDX_8d376ff9138a6e04c6c5b46b6f\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`names\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`lastNames\` varchar(120) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`identificationNumber\` varchar(25) COLLATE "utf8mb4_spanish2_ci" NOT NULL, \`phone\` varchar(20) COLLATE "utf8mb4_spanish2_ci" NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`cityId\` int NOT NULL, \`identificationTypeId\` int NOT NULL, INDEX \`IDX_e465b529f6aac860fd96442ac8\` (\`names\`), INDEX \`IDX_9bf74210a1136fe711e6d94ff8\` (\`identificationNumber\`), INDEX \`IDX_204e9b624861ff4a5b26819210\` (\`createdAt\`), INDEX \`IDX_2a32f641edba1d0f973c19cc94\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`authTokens\` ADD CONSTRAINT \`FK_58deab4e8bdb3a1ba9aeaecdf51\` FOREIGN KEY (\`authId\`) REFERENCES \`auth\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_373ead146f110f04dad60848154\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_38a69a58a323647f2e75eb994de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_22a487fc2fe5c5692ad1960fbd7\` FOREIGN KEY (\`officeId\`) REFERENCES \`offices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_75f60df83c187d9044920d03c27\` FOREIGN KEY (\`officeId\`) REFERENCES \`offices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_40e681891fea5a4b3c5c2546d15\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_ba92d7032b89f4fd952899dbbd2\` FOREIGN KEY (\`itemTypeId\`) REFERENCES \`itemTypes\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` ADD CONSTRAINT \`FK_de27ca62ff9d407bcd347d82d6f\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` ADD CONSTRAINT \`FK_5937ace0185e1803fa96b664a39\` FOREIGN KEY (\`employeerId\`) REFERENCES \`employeers\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` ADD CONSTRAINT \`FK_c8a02a214451aa3992a1061afb7\` FOREIGN KEY (\`officeId\`) REFERENCES \`offices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` ADD CONSTRAINT \`FK_30f7105a0cb628a6346528fb214\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` ADD CONSTRAINT \`FK_75982d9cf45681affe466bd890f\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` ADD CONSTRAINT \`FK_c9dbbefcfcc0cc2c94289ac2d4b\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_49cb607941062b15a336a18c887\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_3785318df310caf8cb8e1e37d85\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1340fee474d41bbab8847df407a\` FOREIGN KEY (\`identificationTypeId\`) REFERENCES \`identification_types\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1340fee474d41bbab8847df407a\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_3785318df310caf8cb8e1e37d85\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_49cb607941062b15a336a18c887\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` DROP FOREIGN KEY \`FK_c9dbbefcfcc0cc2c94289ac2d4b\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`offices\` DROP FOREIGN KEY \`FK_75982d9cf45681affe466bd890f\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` DROP FOREIGN KEY \`FK_30f7105a0cb628a6346528fb214\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`employeers\` DROP FOREIGN KEY \`FK_c8a02a214451aa3992a1061afb7\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` DROP FOREIGN KEY \`FK_5937ace0185e1803fa96b664a39\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`histories\` DROP FOREIGN KEY \`FK_de27ca62ff9d407bcd347d82d6f\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_ba92d7032b89f4fd952899dbbd2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_40e681891fea5a4b3c5c2546d15\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_75f60df83c187d9044920d03c27\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_22a487fc2fe5c5692ad1960fbd7\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_38a69a58a323647f2e75eb994de\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_373ead146f110f04dad60848154\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`authTokens\` DROP FOREIGN KEY \`FK_58deab4e8bdb3a1ba9aeaecdf51\``,
		);
		await queryRunner.query(`DROP INDEX \`IDX_2a32f641edba1d0f973c19cc94\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_204e9b624861ff4a5b26819210\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_9bf74210a1136fe711e6d94ff8\` ON \`users\``);
		await queryRunner.query(`DROP INDEX \`IDX_e465b529f6aac860fd96442ac8\` ON \`users\``);
		await queryRunner.query(`DROP TABLE \`users\``);
		await queryRunner.query(
			`DROP INDEX \`IDX_8d376ff9138a6e04c6c5b46b6f\` ON \`identification_types\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_ba50aa7772cc5758860e26d045\` ON \`identification_types\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_5015ee586a3d770e4aae2821af\` ON \`identification_types\``,
		);
		await queryRunner.query(`DROP TABLE \`identification_types\``);
		await queryRunner.query(`DROP INDEX \`IDX_a0ae8d83b7d32359578c486e7f\` ON \`cities\``);
		await queryRunner.query(`DROP INDEX \`IDX_87cb809d3c82eda5cd4d16f98d\` ON \`cities\``);
		await queryRunner.query(`DROP INDEX \`IDX_9f8debfe7080ceb81f972d8150\` ON \`cities\``);
		await queryRunner.query(`DROP TABLE \`cities\``);
		await queryRunner.query(`DROP INDEX \`IDX_0cae4828de60f787328045c7ba\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_83e74d1ab13c491ecd1e60adb0\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_f631d07cc9a03cc06dc96e3060\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_0a7f7da1323396b5ccd120119c\` ON \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_e393300483e2fd0f55add75acb\` ON \`offices\``);
		await queryRunner.query(`DROP TABLE \`offices\``);
		await queryRunner.query(`DROP INDEX \`IDX_a1b1eb7049c9f1efccaf67c289\` ON \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_359acdae32c7c9a1427fd25738\` ON \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_181926d2333efcf5f689477754\` ON \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_1472ff0394ea793b5817e21e09\` ON \`employeers\``);
		await queryRunner.query(`DROP TABLE \`employeers\``);
		await queryRunner.query(`DROP INDEX \`IDX_c892fefe7ee51d19c8e625d803\` ON \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_1fda56ccf8714b0554f19629e1\` ON \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_9fc84ef7e736ff929bc8fb2a3a\` ON \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_5d977bf3fcb8ca98b9dd668cda\` ON \`histories\``);
		await queryRunner.query(`DROP TABLE \`histories\``);
		await queryRunner.query(`DROP INDEX \`IDX_3844a75711aeaa1cf882b4be73\` ON \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_7d4398587e942a1b2bb93b91e1\` ON \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_ae726a7ea8f4828308ad7bc0a8\` ON \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_213736582899b3599acaade2cd\` ON \`items\``);
		await queryRunner.query(`DROP TABLE \`items\``);
		await queryRunner.query(`DROP INDEX \`IDX_6984ec8fc43755ec86b6fe7383\` ON \`itemTypes\``);
		await queryRunner.query(`DROP INDEX \`IDX_aa8b136c7e2d450827c74ddd73\` ON \`itemTypes\``);
		await queryRunner.query(`DROP INDEX \`IDX_9f146fa5a42577606e98cf7cb4\` ON \`itemTypes\``);
		await queryRunner.query(`DROP TABLE \`itemTypes\``);
		await queryRunner.query(`DROP INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` ON \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_ed61d4dcafb6fe0f595f5e0cbd\` ON \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_f5b48fd28eefb26ad91ec8fd12\` ON \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_a0365502b055164bc8234ae6ff\` ON \`companies\``);
		await queryRunner.query(`DROP TABLE \`companies\``);
		await queryRunner.query(`DROP INDEX \`IDX_1481cb05f929015e6bbb257c25\` ON \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_9e6c6f77fef0901245aa9532e1\` ON \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_48b267d894e32a25ebde4b207a\` ON \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_1e5804195311764dfde99a4379\` ON \`bookings\``);
		await queryRunner.query(`DROP TABLE \`bookings\``);
		await queryRunner.query(`DROP INDEX \`IDX_8681da666ad9699d568b3e9106\` ON \`departments\``);
		await queryRunner.query(`DROP INDEX \`IDX_7644d3260b6315613b4cfe27bf\` ON \`departments\``);
		await queryRunner.query(`DROP INDEX \`IDX_3cc6e9e64e9a12d16dd009c4c2\` ON \`departments\``);
		await queryRunner.query(`DROP TABLE \`departments\``);
		await queryRunner.query(`DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_3a7a2ac1831ef351d76eee1c29\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_392eca727f7ab94f76fe3d687f\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_36169bd5294fc4e10cf1a9dc70\` ON \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_995f4fd7591db88faf612690b7\` ON \`auth\``);
		await queryRunner.query(`DROP TABLE \`auth\``);
		await queryRunner.query(`DROP INDEX \`IDX_fd6ffe8e265b858cddbd58baa7\` ON \`authTokens\``);
		await queryRunner.query(`DROP INDEX \`IDX_209c38a354840ba0c8e19ac97b\` ON \`authTokens\``);
		await queryRunner.query(`DROP INDEX \`IDX_170a56979ec2ef0b345441562e\` ON \`authTokens\``);
		await queryRunner.query(`DROP INDEX \`IDX_a4bb826ae909a57a73b4a7f6e1\` ON \`authTokens\``);
		await queryRunner.query(`DROP TABLE \`authTokens\``);
	}
}
