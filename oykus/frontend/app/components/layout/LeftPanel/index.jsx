import { useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { v, layoutLeftPanelStyles } from "@/assets/style";
import { OkpIcon } from "@/components/common";

function OkpLayoutLeftPanelMenuList({
  data,
  hoveredItem,
  setHoveredItem,
  pressedItem,
  setPressedItem,
  styles,
  isLast,
}) {
  return (
    <FlatList
      contentContainerStyle={[styles.leftPanelMenuList, isLast && styles.leftPanelMenuListLast]}
      data={data}
      renderItem={({ item }) => (
        <Pressable
          onHoverIn={() => setHoveredItem(item.name)}
          onHoverOut={() => setHoveredItem(null)}
          onPressIn={() => setPressedItem(item.name)}
          onPressOut={() => setPressedItem(null)}
          style={({ hovered }) => [
            styles.leftPanelMenuItem,
            hovered && styles.leftPanelMenuItemHovered,
            pressedItem === item.name && styles.leftPanelMenuItemPressed,
          ]}
        >
          <View
            style={[
              styles.leftPanelMenuItemTab,
              (hoveredItem === item.name || pressedItem === item.name) &&
                styles.leftPanelMenuItemTabHovered,
            ]}
          />
          <OkpIcon
            name={item.icon}
            size={24}
            color={
              hoveredItem === item.name || pressedItem === item.name
                ? v.colours.hoverFg
                : v.colours.layout.leftPanel.fg
            }
          />
        </Pressable>
      )}
    />
  );
}

export default function OkpLayoutLeftPanel() {
  const s = layoutLeftPanelStyles();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pressedItem, setPressedItem] = useState(null);

  const menuItems = [
    [{ name: "home", icon: "home-circle-outline" }],
    [
      { name: "community", icon: "account-group" },
      { name: "awards", icon: "certificate-outline" },
      { name: "leaderboard", icon: "podium" },
      { name: "events", icon: "calendar" },
    ],
    [{ name: "settings", icon: "cog-outline" }],
  ];

  return (
    <View style={s.leftPanel}>
      <View style={s.leftPanelMenu}>
        {menuItems.map((data, index) => (
          <OkpLayoutLeftPanelMenuList
            key={`okp-layout-left-panel-menu-list-${index}`}
            data={data}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            pressedItem={pressedItem}
            setPressedItem={setPressedItem}
            styles={s}
            isLast={index === menuItems.length - 1}
          />
        ))}
      </View>
    </View>
  );
}
