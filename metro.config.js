// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
module.exports = {
    ...defaultConfig,
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