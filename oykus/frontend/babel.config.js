module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["@babel/plugin-transform-private-methods", { loose: true }],
    ["module-resolver", {
      root: ["./"],
      alias: {
        "@": "./app",
        "react-native-svg": "react-native-svg/lib/module/ReactNativeSVG.web.js"
      },
    }],
  ],
};
