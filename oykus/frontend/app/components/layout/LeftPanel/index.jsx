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
          data={[{ name: "user", icon: "home-circle-outline" }]}
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
                color={
                  (hoveredItem === item.name || pressedItem === item.name)
                    ? v.colours.hoverFg
                    : v.colours.layout.leftPanel.fg
                }
              />
            </Pressable>
          )}
        />
        <FlatList
          contentContainerStyle={s.leftPanelMenuList}
          data={[
            { name: "users", icon: "account-group" },
            { name: "award", icon: "certificate-outline" },
            { name: "podium", icon: "podium" },
            { name: "calendar", icon: "calendar" },
            { name: "sparkles", icon: "bacteria-outline" },
            { name: "boom-gate", icon: "boom-gate" },
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
                color={
                  (hoveredItem === item.name || pressedItem === item.name)
                    ? v.colours.hoverFg
                    : v.colours.layout.leftPanel.fg
                }
              />
            </Pressable>
          )}
        />
        <FlatList
          style={{ flex: -1 }}
          contentContainerStyle={s.leftPanelMenuList}
          data={[{ name: "settings", icon: "cog-outline" }]}
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
                color={
                  (hoveredItem === item.name || pressedItem === item.name)
                    ? v.colours.hoverFg
                    : v.colours.layout.leftPanel.fg
                }
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
