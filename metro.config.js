// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
module.exports = {
    ...defaultConfig,
    sourceExts: ['js', 'json', 'ts', 'tsx'],
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
        minifierConfig: {
          ...defaultConfig.transformer.minifierConfig,
          sourceMap: true, // Enable source maps
        },
      }),
    },
};