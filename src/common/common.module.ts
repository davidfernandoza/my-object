import { Module, Global } from '@nestjs/common';
import { MessagesServices } from '@common/services/messages.services';
import { CityController } from '@common/controllers/city.controller';
import { DepartmentController } from './controllers/department.controller';
import { Department } from '@common/services/department';
import { City } from './services/city';

@Global()
@Module({
	providers: [MessagesServices, Department, City],
	exports: [MessagesServices],
	controllers: [CityController, DepartmentController],
})
export class CommonModule {}
