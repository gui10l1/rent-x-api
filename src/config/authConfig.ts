interface IAuthConfig {
  secret: string;
  expiresIn: string;
  noTimestamp?: boolean;
}

export default {
  expiresIn: '1d',
  secret: process.env.APP_SECRET || 'defaultForJest',
  noTimestamp: true,
} as IAuthConfig;
