import * as joi from 'joi';

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
	SENTRY_DSN: joi.string(),
	SENTRY_ENABLE: joi.string().default('false').valid('true', 'false'),
	EMAIL_HOST: joi.string().required(),
	EMAIL_PORT: joi.number().required(),
	EMAIL_USER: joi.string().required(),
	EMAIL_PASSWORD: joi.string().required(),
	EMAIL_FROM: joi.string().required(),
});
