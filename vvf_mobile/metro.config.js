// metro.config.js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const baseConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: baseConfig.resolver.assetExts,
    sourceExts: baseConfig.resolver.sourceExts,
  },
};

module.exports = wrapWithReanimatedMetroConfig(mergeConfig(baseConfig, config));
