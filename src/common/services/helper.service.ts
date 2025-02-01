import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HelperService {
	generateCode(digits: number): string {
		const array = new Uint32Array(1);
		crypto.getRandomValues(array);
		return String(array[0] % 1000000).padStart(digits, '0');
	}
}
