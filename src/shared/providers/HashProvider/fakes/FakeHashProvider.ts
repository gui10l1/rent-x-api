import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async hash(payload: string): Promise<string> {
    return payload;
  }

  public async compare(hashed: string, payload: string): Promise<boolean> {
    return payload === hashed;
  }
}
