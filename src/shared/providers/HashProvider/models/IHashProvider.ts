export default interface IHashProvider {
  hash(payload: string): Promise<string>;
  compare(hashed: string, payload: string): Promise<boolean>;
}
