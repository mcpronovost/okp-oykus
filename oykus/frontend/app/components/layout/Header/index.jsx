import { useState } from "react";
import {
  View,
  Image,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { layoutHeaderStyles } from "@/assets/style";
import { OkpImage, OkpText } from "@/components/common";
import OkpLayoutHeaderNotifications from "./Notifications";

export default function OkpLayoutHeader() {
  const { width } = useWindowDimensions();
  const s = layoutHeaderStyles();

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <View style={s.header}>
      <View style={s.brand}>
        <View style={s.brandLogo}>
          <Image
            source={require("@/assets/img/logo.png")}
            style={s.brandLogoImage}
          />
        </View>
        <OkpText style={s.brandName}>Oykus</OkpText>
      </View>
      <View style={s.menu}>
        {width >= 992 && (
          <FlatList
            data={[
              { id: 1, name: "Devlog" },
              { id: 2, name: "FAQ" },
              { id: 3, name: "About" },
            ]}
            renderItem={({ item, index }) => (
              <Pressable
                onHoverIn={() => setHoveredItem(index)}
                onHoverOut={() => setHoveredItem(null)}
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
        )}
      </View>
      <View style={s.spacer} />
      <OkpLayoutHeaderNotifications />
      <View style={s.user}>
        <Pressable style={s.userIdentity}>
          <OkpText style={s.userName}>mcpronovost</OkpText>
          <View style={s.userAvatar}>
            <OkpImage
              source={require("@/assets/img/placeholders/mcpronovost.jpg")}
              style={s.userAvatarImage}
            />
            <View style={s.userAvatarStatus} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
