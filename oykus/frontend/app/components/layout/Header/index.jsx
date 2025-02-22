import { useContext, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { v, layoutHeaderStyles as s } from "@/assets/style";
import { OkpText } from "@/components/common";
import { RouterContext } from "@/services/router";
import OkpLayoutHeaderNotifications from "./Notifications";
import OkpLayoutHeaderUser from "./User";

export default function OkpLayoutHeader() {
  const { go } = useContext(RouterContext);
  const { width } = useWindowDimensions();

  const [hoveredItem, setHoveredItem] = useState(null);

  const handlePress = (r) => {
    go(r);
  };

  return (
    <View style={s.header}>
      <View style={s.brand}>
        <View style={s.brandLogo}>
          <Image
            source={require("@/assets/img/logo.png")}
            style={s.brandLogoImage}
          />
        </View>
        {width >= v.breakpoints.xs && (
          <OkpText style={s.brandName}>Oykus</OkpText>
        )}
      </View>
      {width >= v.breakpoints.lg && (
        <View style={s.menu}>
          <FlatList
            data={[
              { id: 1, route: "devlog", name: "Devlog" },
              { id: 2, route: "faq", name: "FAQ" },
              { id: 3, route: "about", name: "About" },
            ]}
            renderItem={({ item, index }) => (
              <Pressable
                onHoverIn={() => setHoveredItem(index)}
                onHoverOut={() => setHoveredItem(null)}
                onPress={() => handlePress(item.route)}
                style={({ hovered, pressed }) => [
                  s.menuItem,
                  hovered && s.menuItemHovered,
                  pressed && s.menuItemPressed,
                ]}
              >
                <OkpText
                  style={[
                    s.menuText,
                    hoveredItem === index && s.menuTextHovered,
                  ]}
                >
                  {item.name}
                </OkpText>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={s.menuList}
          />
        </View>
      )}
      <View style={s.spacer} />
      {width >= v.breakpoints.sm && (<OkpLayoutHeaderNotifications />)}
      <OkpLayoutHeaderUser width={width} />
    </View>
  );
}
