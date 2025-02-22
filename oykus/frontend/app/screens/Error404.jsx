import { View, StyleSheet } from "react-native";
import { OkpButton, OkpText } from "@/components/common";
import { v, layoutStyles } from "@/assets/style";

export default function Error404() {
  const s = layoutStyles();

  return (
    <View style={s.core}>
      <OkpText style={styles.title}>
        404
      </OkpText>
      <OkpText style={styles.subtitle}>
        Oops! The page you're looking for is not here.
      </OkpText>
      <OkpText style={styles.description}>
        We are sorry for the inconvenience. The page you are trying to access has been moved or has never existed.
      </OkpText>
      <OkpButton
        title="Go Back"
        action="goback"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: v.colours.primary,
    fontFamily: v.fonts.defaultBold,
    fontSize: 120,
    lineHeight: 120,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: v.colours.fg,
    fontFamily: v.fonts.defaultBold,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    color: v.colours.subtleFg,
    fontSize: 16,
    textAlign: "center",
    maxWidth: 300,
  },
});
