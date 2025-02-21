import { StyleSheet } from "react-native";
import { v } from "@/assets/style/variables";

export const layoutRightPanelStyles = () =>
  StyleSheet.create({
    rightPanel: {
      backgroundColor: v.colours.layout.rightPanel.bg,
      color: v.colours.layout.rightPanel.fg,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: 64,
      height: "100%",
      gap: 64,
    },
    rightPanelMenu: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      gap: 64,
    },
    rightPanelMenuList: {
      justifyContent: "center",
      alignItems: "center",
    },
    rightPanelMenuItem: {
      color: v.colours.layout.rightPanel.fg,
      flexBasis: 64,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: 64,
      transition: "color 0.3s, background-color 0.3s",
    },
    rightPanelMenuItemHovered: {
      color: v.colours.layout.rightPanel.hoverFg,
    },
    rightPanelMenuItemPressed: {
      color: v.colours.layout.rightPanel.hoverFg,
      opacity: 0.5,
    },
    rightPanelMenuItemTab: {
      backgroundColor: v.colours.layout.rightPanel.fg,
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
    rightPanelMenuItemTabHovered: {
      backgroundColor: v.colours.layout.rightPanel.hoverFg,
      width: 4,
      opacity: 1,
      transform: [{ translateY: -8}, {scaleY: 1 }],
    },
  });
