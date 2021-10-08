import IMailTemplateProviderDTO from '../dtos/IMailTemplateProviderDTO';

export default interface IMailTemplateProvider {
  compile(data: IMailTemplateProviderDTO): Promise<string>;
}
