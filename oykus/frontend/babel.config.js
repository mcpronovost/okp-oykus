module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        root: ["./"],
        alias: {
          "@": "./app",
          "react-native-svg": "react-native-svg/lib/module/ReactNativeSVG.web.js"
        },
      }],
    ],
  };
};
