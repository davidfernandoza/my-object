import { registerAs } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

export const EXTERNAL_URL = 'https://pokeapi.co/api/v2/pokemon/ditto';
export const EXTERNAL_SERVICE = 'EXTERNAL_URL';

export const appConfig = registerAs('config', () => ({
	app: {
		port: process.env.APP_PORT,
		name: process.env.APP_NAME,
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
	sentry: {
		dsn: process.env.SENTRY_DSN,
		enable: process.env.SENTRY_ENABLE === 'true',
	},
	mail: {
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),
		user: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASSWORD,
		from: process.env.EMAIL_FROM,
	},
	jwt: {
		access_secret: process.env.JWT_ACCESS_SECRET,
		access_expiration: process.env.JWT_ACCESS_EXPIRATION,
		refresh_secret: process.env.JWT_REFRESH_SECRET,
		refresh_expiration: process.env.JWT_REFRESH_EXPIRATION,
	},
	apiKey: process.env.API_KEY,
}));

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
