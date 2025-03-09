module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@types': './src/types'
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts']
      },
    ],
  ],
};
