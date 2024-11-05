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
	apiKey: process.env.API_KEY,
}));

// Validacion de las variables de entorno del archivo .env
export const appConfigSchema = joi.object({
	APP_PORT: joi.number().required(),
	APP_NAME: joi.string().required(),
	APP_SALT: joi.string().required(),
	APP_ENVIRONMENT: joi.string().required(),
	API_KEY: joi.string(),
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
