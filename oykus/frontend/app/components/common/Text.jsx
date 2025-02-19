import { Text } from "react-native";
import { textStyles } from "@/assets/style";

export default function OkpText({ children, style }) {
  const s = textStyles();

  return <Text style={[s.text, style]}>{children}</Text>;
}
