import { StyleSheet } from "react-native";
import { v } from "@/assets/style/variables";

export const textStyles = () => StyleSheet.create({
  text: {
    ...v.fonts.default,
    fontSize: 16,
    color: "inherit",
  },
});