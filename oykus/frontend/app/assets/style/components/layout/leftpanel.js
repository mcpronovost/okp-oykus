import { StyleSheet } from "react-native";
import { v } from "@/assets/style/variables";

export const layoutLeftPanelStyles = () =>
  StyleSheet.create({
    leftPanel: {
      backgroundColor: v.colours.layout.leftPanel.bg,
      color: v.colours.layout.leftPanel.fg,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: 64,
      height: "100%",
      gap: 64,
    },
    leftPanelMenu: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      gap: 64,
    },
    leftPanelMenuList: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    leftPanelMenuItem: {
      flex: 1,
      flexBasis: 64,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: 64,
      transition: "color 0.3s, background-color 0.3s",
    },
    leftPanelMenuItemHovered: {
      color: v.colours.layout.leftPanel.hoverFg,
    },
    leftPanelMenuItemTab: {
      backgroundColor: v.colours.layout.leftPanel.fg,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      width: 0,
      height: 16,
      position: "absolute",
      top: "50%",
      left: 0,
      opacity: 0,
      transform: [{ translateY: -8}, {scaleY: 0 }],
      transition: "opacity 0.3s, width 0.3s, transform 0.3s",
    },
    leftPanelMenuItemTabHovered: {
      backgroundColor: v.colours.layout.leftPanel.hoverFg,
      width: 4,
      opacity: 1,
      transform: [{ translateY: -8}, {scaleY: 1 }],
    },
  });
