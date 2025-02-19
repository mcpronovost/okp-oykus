import { StyleSheet } from "react-native";
import { v } from "@/assets/style/variables";

export const layoutHeaderStyles = () =>
  StyleSheet.create({
    header: {
      backgroundColor: v.colours.layout.header.bg,
      color: v.colours.layout.header.fg,
      flex: 0,
      flexBasis: 64,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: 64,
      gap: 8,
    },
    brand: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginRight: 32,
    },
    brandLogo: {
      width: 64,
      height: 64,
      alignItems: "center",
      justifyContent: "center",
    },
    brandLogoImage: {
      width: 48,
      height: 48,
    },
    brandName: {
      ...v.fonts.defaultBold,
      color: v.colours.layout.header.hoverFg,
      fontSize: 24,
      textTransform: "uppercase",
    },
    menu: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      marginLeft: 32,
      marginRight: 32,
    },
    menuList: {
      gap: 16,
      flex: 1,
      height: "100%",
    },
    menuItem: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "transparent",
      flex: 1,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    menuItemHovered: {
      color: v.colours.primary,
    },
    menuItemPressed: {
      opacity: 0.5,
      scale: 0.9,
    },
    menuText: {
      ...v.fonts.default,
      fontSize: 12,
      userSelect: "none",
      transition: "color 0.3s",
    },
    menuTextHovered: {
      color: v.colours.primary,
    },
    spacer: {
      flex: 1,
    },
    user: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 32,
    },
    userIdentity: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    userName: {
      ...v.fonts.default,
      fontSize: 14,
    },
    userAvatar: {
      position: "relative",
      width: 64,
      height: 64,
      alignItems: "center",
      justifyContent: "center",
    },
    userAvatarImage: {
      borderRadius: 48,
      overflow: "hidden",
      width: 48,
      height: 48,
      backgroundColor: v.colours.layout.header.hoverBg,
    },
    userAvatarStatus: {
      backgroundColor: v.colours.primary,
      borderColor: v.colours.layout.header.bg,
      borderWidth: 3,
      borderRadius: 16,
      width: 16,
      height: 16,
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      transform: [{ translateX: -8 }, { translateY: -8 }],
    },
  });

export const layoutHeaderNotificationsStyles = () =>
  StyleSheet.create({
    notifications: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 64,
      marginLeft: 32,
      marginRight: 32,
    },
    notificationsList: {
      flexDirection: "row",
      alignItems: "center",
      height: 64,
    },
    notificationsItem: {
      userSelect: "none",
      alignItems: "center",
      justifyContent: "center",
      width: 64,
      height: 64,
      transition: "color 0.3s",
    },
    notificationsItemHovered: {
      color: v.colours.primary,
    },
    notificationsItemPressed: {
      opacity: 0.5,
      scale: 0.9,
    },
  });
