import { Text } from "react-native";
import { v, textStyles } from "@/assets/style";

export default function OkpText({ children, style, bold }) {
  const s = textStyles();

  const styles = [
    s.text,
    bold && { fontFamily: v.fonts.defaultBold },
    ...(Array.isArray(style) ? style : [style]),
  ];

  return <Text style={styles}>{children}</Text>;
}
