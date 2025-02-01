import { MessagesCodeEnum } from '@common/enums/messages-code.enum';
import { MessagesEnum } from '@common/enums/messages.enum';

export class MessagesService {
	send(code: number): string {
		return MessagesEnum[MessagesCodeEnum[code]] ?? MessagesEnum[MessagesCodeEnum[500]];
	}
}
