module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@custom-types': './src/types',
          '@components': './src/ui/components',
          '@data': './src/data',
          '@constants': './src/constants',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts'],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
