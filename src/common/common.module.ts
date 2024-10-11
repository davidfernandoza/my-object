import { Module } from '@nestjs/common';
import { MessagesServices } from './services/messages.services';

@Module({
	providers: [MessagesServices],
	exports: [MessagesServices],
})
export class CommonModule {}
