import IMailTemplateProviderDTO from '../dtos/IMailTemplateProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  private templates: IMailTemplateProviderDTO[] = [];

  public async compile(data: IMailTemplateProviderDTO): Promise<string> {
    this.templates.push(data);

    return 'link-to-template';
  }
}
