import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import moment from 'moment';

@Injectable()
export class HelperService {
	generateCode(digits: number): string {
		const array = new Uint32Array(1);
		crypto.getRandomValues(array);
		return String(array[0] % 1000000).padStart(digits, '0');
	}

	isExpired(dateTime: string | null, nullResponse = false): boolean {
		if (!dateTime) return nullResponse;
		return moment().isAfter(moment(dateTime, 'YYYY-MM-DD HH:mm:ss'));
	}
}
