import { Module } from '@nestjs/common';
import { MessagesServices } from '@common-v1/services/messages.services';

@Module({
	providers: [MessagesServices],
	exports: [MessagesServices],
})
export class CommonModule {}
