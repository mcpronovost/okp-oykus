import { View, Pressable } from "react-native";
import { layoutHeaderNotificationsStyles } from "@/assets/style";
import { Bell, Mail, Smile } from "lucide-react-native";

export default function OkpLayoutHeaderNotifications() {
  const s = layoutHeaderNotificationsStyles();

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
            <Bell size={16} />
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
            <Mail size={16} />
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
            <Smile size={16} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
