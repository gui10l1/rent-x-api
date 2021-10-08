import IMailTemplateProviderDTO from '@shared/providers/MailTemplateProvider/dtos/IMailTemplateProviderDTO';

export default interface IMailProviderDTO {
  from?: {
    name: string;
    address: string;
  };
  to: {
    name: string;
    address: string;
  };
  subject: string;
  template: IMailTemplateProviderDTO;
}
