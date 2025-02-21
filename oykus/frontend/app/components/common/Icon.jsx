import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { v } from "@/assets/style/variables";

export default function OkpIcon({ name, size = 24, color = v.colours.fg }) {
  const props = { name, size, color };

  return <MaterialCommunityIcons {...props} />;
}
