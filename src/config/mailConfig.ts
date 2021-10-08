interface IMailConfig {
  type: 'ethereal';
  config: {
    ethereal: {
      from: {
        name: string;
        address: string;
      };
    };
  };
}

export default {
  type: 'ethereal',
  config: {
    ethereal: {
      from: {
        address: 'default@address.com',
        name: 'Default name',
      },
    },
  },
} as IMailConfig;
