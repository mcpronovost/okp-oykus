module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["module:@react-native-vector-icons/common"],
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./app",
        },
      },
    ],
  ],
};
