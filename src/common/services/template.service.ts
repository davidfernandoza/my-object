import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class TemplateService {
	compile(templateName: string, data: Record<string, any>): string {
		const templateSource = fs.readFileSync(
			path.join(process.cwd(), 'src', 'common', 'templates', `${templateName}.html`),
			'utf8',
		);
		const compiledTemplate = handlebars.compile(templateSource);
		return compiledTemplate(data);
	}
}
