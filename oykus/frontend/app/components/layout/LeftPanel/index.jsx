import { useContext, useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { v, layoutLeftPanelStyles } from "@/assets/style";
import { RouterContext } from "@/services/router";
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
  const { go } = useContext(RouterContext);

  const handlePress = (r) => {
    go(r);
  };

  return (
    <FlatList
      contentContainerStyle={[styles.leftPanelMenuList, isLast && styles.leftPanelMenuListLast]}
      data={data}
      renderItem={({ item }) => (
        <Pressable
          onHoverIn={() => setHoveredItem(item.route)}
          onHoverOut={() => setHoveredItem(null)}
          onPressIn={() => setPressedItem(item.route)}
          onPressOut={() => setPressedItem(null)}
          onPress={() => handlePress(item.route)}
          style={({ hovered }) => [
            styles.leftPanelMenuItem,
            hovered && styles.leftPanelMenuItemHovered,
            pressedItem === item.route && styles.leftPanelMenuItemPressed,
          ]}
        >
          <View
            style={[
              styles.leftPanelMenuItemTab,
              (hoveredItem === item.route || pressedItem === item.route) &&
                styles.leftPanelMenuItemTabHovered,
            ]}
          />
          <OkpIcon
            name={item.icon}
            size={24}
            color={
              hoveredItem === item.route || pressedItem === item.route
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
    [{ route: "/", icon: "home-circle-outline" }],
    [
      { route: "community", icon: "account-group" },
      { route: "awards", icon: "certificate-outline" },
      { route: "leaderboard", icon: "podium" },
      { route: "events", icon: "calendar" },
    ],
    [{ route: "settings", icon: "cog-outline" }],
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
