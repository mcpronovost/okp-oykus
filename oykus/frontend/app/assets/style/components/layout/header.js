import { StyleSheet } from "react-native";
import { v } from "@/assets/style/variables";

export const layoutHeaderStyles = () => StyleSheet.create({
  header: {
    backgroundColor: v.colours.layout.header.bg,
    color: v.colours.layout.header.fg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 64,
    gap: 64,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandLogo: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLogoImage: {
    width: 32,
    height: 32,
  },
  brandName: {
    ...v.fonts.defaultBold,
    fontSize: 24,
    textTransform: "uppercase",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
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
    color: "#F7BB0D",
  },
  menuItemPressed: {
    opacity: 0.5,
    scale: 0.95,
  },
  menuText: {
    ...v.fonts.default,
    fontSize: 14,
    userSelect: "none",
    transition: "color 0.3s",
  },
  menuTextHovered: {
    color: "#F7BB0D",
  },
  spacer: {
    flex: 1,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userName: {
    ...v.fonts.default,
    fontSize: 16,
  },
  userAvatar: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatarImage: {
    width: 32,
    height: 32,
  },
});

export const layoutHeaderNotificationsStyles = () => StyleSheet.create({
  notifications: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  notificationsList: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  notificationsItem: {
    userSelect: "none",
    transition: "color 0.3s",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  notificationsItemHovered: {
    color: "#F7BB0D",
  },
  notificationsItemPressed: {
    opacity: 0.5,
    scale: 0.8,
  },
});
