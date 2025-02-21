import { useState } from "react";
import { View, Pressable } from "react-native";
import { layoutHeaderNotificationsStyles as s } from "@/assets/style";
import { v } from "@/assets/style/variables";
import OkpIcon from "@/components/common/Icon";

function NotificationItem({ name, iconName }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pressedItem, setPressedItem] = useState(null);

  return (
    <Pressable
      onHoverIn={() => setHoveredItem(name)}
      onHoverOut={() => setHoveredItem(null)}
      onPressIn={() => setPressedItem(name)}
      onPressOut={() => setPressedItem(null)}
      style={({ hovered, pressed }) => [
        s.notificationsItem,
        hovered && s.notificationsItemHovered,
        pressed && s.notificationsItemPressed,
      ]}
    >
      <View style={s.notificationsItemIcon}>
        <OkpIcon
          name={iconName}
          size={16}
          color={
            hoveredItem === name || pressedItem === name
              ? v.colours.primary
              : v.colours.layout.header.fg
          }
        />
      </View>
    </Pressable>
  );
}

export default function OkpLayoutHeaderNotifications() {
  return (
    <View style={s.notifications}>
      <View style={s.notificationsList}>
        <NotificationItem name="bell" iconName="bell-outline" />
        <NotificationItem name="email" iconName="email-outline" />
        <NotificationItem name="smile" iconName="emoticon-happy-outline" />
      </View>
    </View>
  );
}
