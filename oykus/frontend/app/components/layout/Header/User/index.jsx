import { memo } from "react";
import { View, Pressable } from "react-native";
import { OkpText, OkpImage } from "@/components/common";
import { v, layoutHeaderStyles as s } from "@/assets/style";

const UserIdentity = memo(({ showName }) => {
  return (
    <Pressable style={({ pressed }) => [s.userIdentity, pressed && s.userIdentityPressed]}>
      {showName && (
        <OkpText style={s.userName}>mcpronovost</OkpText>
      )}
      <View style={s.userAvatar}>
        <OkpImage
          source={require("@/assets/img/placeholders/mcpronovost.jpg")}
          style={s.userAvatarImage}
        />
        <View style={s.userAvatarStatus} />
      </View>
    </Pressable>
  );
});

export default function User({ width }) {
  return (
    <View style={s.user}>
      <UserIdentity showName={width >= v.breakpoints.lg} />
    </View>
  );
}
