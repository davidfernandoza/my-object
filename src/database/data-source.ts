import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const type = process.env.DB_TYPE as 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql';

// Configuración de DataSource
export const AppDataSource = new DataSource({
	type: type,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: ['src/database/entities/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsTableName: 'migrations',
	synchronize: false,
	logging: false,
	charset: 'utf8mb4_spanish2_ci',
});
