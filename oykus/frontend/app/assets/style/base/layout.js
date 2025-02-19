import { StyleSheet } from "react-native";
import { v } from "@/assets/style/variables";

export const layoutStyles = () => StyleSheet.create({
  safeArea: {
    backgroundColor: v.colours.layout.header.bg,
    color: v.colours.layout.header.fg,
    flex: 1,
  },
  safeProvider: {
    flex: 1,
  },
  core: {
    backgroundColor: v.colours.bg,
    color: v.colours.fg,
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
  coreProvider: {
    flex: 1,
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
