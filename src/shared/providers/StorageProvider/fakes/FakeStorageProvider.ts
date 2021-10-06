import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(fileName: string): Promise<string> {
    this.files.push(fileName);

    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const updatedFiles = this.files.filter(file => file !== fileName);

    this.files = updatedFiles;
  }

  public async deleteFilesFromTempFolder(): Promise<void> {
    // CODE
  }
}
