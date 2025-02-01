import { Module, Global } from '@nestjs/common';

import { MessagesService } from '@common/services/messages.service';
import { CityController } from '@common/controllers/city.controller';
import { DepartmentController } from '@common/controllers/department.controller';
import { DepartmentService } from '@common/services/department.service';
import { CityService } from '@common/services/city.service';
import { IsUniqueConstraint } from '@common/decorators/is-unique.decorador';
import { MailService } from '@common/services/mail.service';
import { TemplateService } from '@common/services/template.service';
import { HelperService } from '@common/services/helper.service';

/*
 * Se inyecta el constraint para que nest pueda inyecte la dependencia que
 * este modulo necesita
 */
@Global()
@Module({
	providers: [
		MessagesService,
		DepartmentService,
		CityService,
		IsUniqueConstraint,
		MailService,
		TemplateService,
		HelperService,
	],
	controllers: [CityController, DepartmentController],
	exports: [MessagesService, MailService, TemplateService, HelperService],
})
export class CommonModule {}
