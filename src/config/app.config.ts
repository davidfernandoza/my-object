import { registerAs } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as joi from 'joi';

export const EXTERNAL_URL = 'https://pokeapi.co/api/v2/pokemon/ditto';
export const EXTERNAL_SERVICE = 'EXTERNAL_URL';

export const appConfig = registerAs('config', () => ({
	app: {
		port: process.env.APP_PORT,
		name: process.env.APP_NAME,
		salt: process.env.APP_SALT,
		environment: process.env.APP_ENVIRONMENT,
	},
	database: {
		type: process.env.DB_TYPE || 'mysql',
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT) || 3306,
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || 'root',
		database: process.env.DB_DATABASE || 'test',
	},
	documentation: {
		url_development: process.env.DOC_URL_DEVELOPMENT,
		url_testing: process.env.DOC_URL_TESTING,
		url_production: process.env.DOC_URL_PRODUCTION,
	},
	apiKey: process.env.API_KEY,
}));

// Validacion de las variables de entorno del archivo .env
export const appConfigSchema = joi.object({
	APP_PORT: joi.number().required(),
	APP_NAME: joi.string().required(),
	APP_SALT: joi.string().required(),
	APP_ENVIRONMENT: joi.string().required(),
	API_KEY: joi.string(),
	DB_TYPE: joi.string().valid('mysql', 'postgres', 'mariadb', 'sqlite', 'mssql').required(),
	DB_HOST: joi.string().required(),
	DB_PORT: joi.number().required(),
	DB_USERNAME: joi.string().required(),
	DB_PASSWORD: joi.string().required(),
	DB_DATABASE: joi.string().required(),
	DOC_URL_DEVELOPMENT: joi.string().required(),
	DOC_URL_TESTING: joi.string().required(),
	DOC_URL_PRODUCTION: joi.string().required(),
});

/*
 * Esta clase se crea para poder inyectar la configuracion en archivos sin clases como el main.ts
 */
@Injectable()
export class ConfigService {
	constructor(@Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>) {}

	getConfig() {
		return this.config;
	}
}
