import { DataSource } from 'typeorm';

// Configuración de DataSource
export const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3307,
	username: 'root',
	password: '123456789',
	database: 'my_object',
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsTableName: 'migrations',
	synchronize: false,
	logging: false,
});
