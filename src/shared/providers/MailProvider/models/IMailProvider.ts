import IMailProviderDTO from '../dtos/IMailProviderDTO';

export default interface IMailProvider {
  send(data: IMailProviderDTO): Promise<void>;
}
