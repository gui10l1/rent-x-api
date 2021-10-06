export default interface IUsersRepositoryDTO {
  name: string;
  profileImage: string;
  email: string;
  password: string;
  admin?: boolean;
}
