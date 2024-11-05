import { Module, Global } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';

import { EXTERNAL_SERVICE, EXTERNAL_URL, ConfigService } from '@src/config/app.config';
import { getPokemons, GET_POKEMONS } from '@src/config/concept-test.config';

@Global()
@Module({
	imports: [HttpModule],
	providers: [
		ConfigService,
		{
			provide: EXTERNAL_SERVICE,
			useValue: EXTERNAL_URL,
		},
		{
			/*
			 * El "useFactory" funciona  igual que el "useValue" pero  es una forma de tener logica para procesar los valores a inyectar, se debe de pensar como una forma de inyectar un valor de forma dinamica o como un "getter"
			 */
			provide: GET_POKEMONS,
			useFactory: getPokemons,
			inject: [HttpService, EXTERNAL_SERVICE],
		},
	],
	exports: [EXTERNAL_SERVICE, GET_POKEMONS, ConfigService],
})
export class ConfigModule {}
