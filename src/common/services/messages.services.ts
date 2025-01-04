import { MessagesEnum } from '@common/enums/messages.enum';

export class MessagesServices {
	send(code: number): string {
		return MessagesEnum[code] ?? MessagesEnum[500];
	}
}
