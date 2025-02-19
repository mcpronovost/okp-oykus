import { useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { v, layoutLeftPanelStyles } from "@/assets/style";
import { OkpIcon } from "@/components/common";

export default function OkpLayoutLeftPanel() {
  const s = layoutLeftPanelStyles();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pressedItem, setPressedItem] = useState(null);

  return (
    <View style={s.leftPanel}>
      <View style={s.leftPanelMenu}>
        <FlatList
          style={{ flex: -1 }}
          contentContainerStyle={s.leftPanelMenuList}
          data={[{ name: "user", icon: "contact-round" }]}
          renderItem={({ item }) => (
            <Pressable
              onHoverIn={() => setHoveredItem(item.name)}
              onHoverOut={() => setHoveredItem(null)}
              onPressIn={() => setPressedItem(item.name)}
              onPressOut={() => setPressedItem(null)}
              style={({ hovered }) => [
                s.leftPanelMenuItem,
                hovered && s.leftPanelMenuItemHovered,
                pressedItem === item.name && s.leftPanelMenuItemPressed,
              ]}
            >
              <View
                style={[
                  s.leftPanelMenuItemTab,
                  (hoveredItem === item.name || pressedItem === item.name) &&
                    s.leftPanelMenuItemTabHovered,
                ]}
              />
              <OkpIcon
                name={item.icon}
                size={24}
                color={v.colours.layout.leftPanel.fg}
              />
            </Pressable>
          )}
        />
        <FlatList
          contentContainerStyle={s.leftPanelMenuList}
          data={[
            { name: "users", icon: "users" },
            { name: "award", icon: "award" },
            { name: "chart-no-axes-combined", icon: "chart-no-axes-combined" },
            { name: "calendar", icon: "calendar" },
            { name: "sparkles", icon: "sparkles" },
          ]}
          renderItem={({ item }) => (
            <Pressable
              onHoverIn={() => setHoveredItem(item.name)}
              onHoverOut={() => setHoveredItem(null)}
              onPressIn={() => setPressedItem(item.name)}
              onPressOut={() => setPressedItem(null)}
              style={({ hovered }) => [
                s.leftPanelMenuItem,
                hovered && s.leftPanelMenuItemHovered,
                pressedItem === item.name && s.leftPanelMenuItemPressed,
              ]}
            >
              <View
                style={[
                  s.leftPanelMenuItemTab,
                  (hoveredItem === item.name || pressedItem === item.name) &&
                    s.leftPanelMenuItemTabHovered,
                ]}
              />
              <OkpIcon
                name={item.icon}
                size={24}
                color={v.colours.layout.leftPanel.fg}
              />
            </Pressable>
          )}
        />
        <FlatList
          style={{ flex: -1 }}
          contentContainerStyle={s.leftPanelMenuList}
          data={[{ name: "settings", icon: "cog" }]}
          renderItem={({ item }) => (
            <Pressable
              onHoverIn={() => setHoveredItem(item.name)}
              onHoverOut={() => setHoveredItem(null)}
              onPressIn={() => setPressedItem(item.name)}
              onPressOut={() => setPressedItem(null)}
              style={({ hovered }) => [
                s.leftPanelMenuItem,
                hovered && s.leftPanelMenuItemHovered,
                pressedItem === item.name && s.leftPanelMenuItemPressed,
              ]}
            >
              <View
                style={[
                  s.leftPanelMenuItemTab,
                  (hoveredItem === item.name || pressedItem === item.name) &&
                    s.leftPanelMenuItemTabHovered,
                ]}
              />
              <OkpIcon
                name={item.icon}
                size={24}
                color={v.colours.layout.leftPanel.fg}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
