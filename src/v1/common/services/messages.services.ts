import { MessagesEnum } from '@common-v1/enums/messages.enum';

export class MessagesServices {
	send(code: number): string {
		return MessagesEnum[code] ?? MessagesEnum[500];
	}
}
