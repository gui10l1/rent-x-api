import IMailProviderDTO from '../dtos/IMailProviderDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private mails: IMailProviderDTO[] = [];

  public async send(data: IMailProviderDTO): Promise<void> {
    this.mails.push(data);
  }
}
