import { View, Pressable } from "react-native";
import { layoutHeaderNotificationsStyles as s } from "@/assets/style";
import { v } from "@/assets/style/variables";
import OkpIcon from "@/components/common/Icon";

export default function OkpLayoutHeaderNotifications() {
  return (
    <View style={s.notifications}>
      <View style={s.notificationsList}>
        <Pressable
          style={({ hovered, pressed }) => [
            s.notificationsItem,
            hovered && s.notificationsItemHovered,
            pressed && s.notificationsItemPressed,
          ]}
        >
          <View style={s.notificationsItemIcon}>
            <OkpIcon
              name="bell"
              size={16}
            />
          </View>
        </Pressable>
        <Pressable
          style={({ hovered, pressed }) => [
            s.notificationsItem,
            hovered && s.notificationsItemHovered,
            pressed && s.notificationsItemPressed,
          ]}
        >
          <View style={s.notificationsItemIcon}>
            <OkpIcon
              name="email-outline"
              size={16}
              color={v.colours.layout.header.fg}
            />
          </View>
        </Pressable>
        <Pressable
          style={({ hovered, pressed }) => [
            s.notificationsItem,
            hovered && s.notificationsItemHovered,
            pressed && s.notificationsItemPressed,
          ]}
        >
          <View style={s.notificationsItemIcon}>
            <OkpIcon
              name="emoticon-happy-outline"
              size={16}
              color={v.colours.layout.header.fg}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
