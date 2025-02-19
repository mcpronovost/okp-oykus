import { StyleSheet } from "react-native";

export const layoutStyles = () => StyleSheet.create({
  core: {
    backgroundColor: "#161B28",
    color: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    margin: 0,
    padding: 0,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  leftPanel: {
    backgroundColor: "#111520",
    color: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    width: 64,
  },
  leftPanelText: {
    color: "#fff",
  },
  rightPanel: {
    backgroundColor: "#111520",
    color: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    width: 64,
  },
  rightPanelText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
