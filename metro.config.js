const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Exclure les fichiers de test du bundling
config.resolver.blockList = [/.*\/_tests_\/.*/];

module.exports = config;
