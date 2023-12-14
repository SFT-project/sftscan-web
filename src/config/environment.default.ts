import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  alternativeLogo: true,
  apiUrl: 'http://43.198.91.241/api',
  apiBaseUrl: 'http://43.198.91.241',
  blockchain: {
    coinName: 'SFT',
  },
  defaultLocale: 'en',
  environments: [
    {
      name: 'Testnet',
      url: 'http://localhost:3000',
    },
    {
      name: 'Mainnet',
      url: 'http://localhost:3000',
    },
  ],
  isLoggerEnabled: true,
};