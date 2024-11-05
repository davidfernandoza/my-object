import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export const GET_POKEMONS = 'GET_POKEMONS';

export const getPokemons = async (http: HttpService, url: string) => {
	const request = http.get(url);
	const { data } = await lastValueFrom(request);
	return data;
};
