export default interface IMailTemplateProviderDTO {
  templateFilePath: string;
  variables: {
    [key: string]: string;
  };
}
