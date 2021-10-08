import fs from 'fs';
import { compile } from 'handlebars';
import path from 'path';

import IMailTemplateProviderDTO from '../dtos/IMailTemplateProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsProvider implements IMailTemplateProvider {
  public async compile(data: IMailTemplateProviderDTO): Promise<string> {
    const pathToTemplate = path.resolve(data.templateFilePath);
    const fileRead = await fs.promises.readFile(pathToTemplate, {
      encoding: 'utf-8',
    });

    const fileCompiled = compile(fileRead, {});
    const HTMLtemplate = fileCompiled(data.variables);

    return HTMLtemplate;
  }
}
