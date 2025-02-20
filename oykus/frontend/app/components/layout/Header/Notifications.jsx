import { View, Pressable } from "react-native";
import { layoutHeaderNotificationsStyles } from "@/assets/style";
import OkpIcon from "@/components/common/Icon";

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
            <OkpIcon name="bell" size={16} stroke={2} />
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
            <OkpIcon name="mail" size={16} stroke={2} />
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
            <OkpIcon name="smile" size={16} stroke={2} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
