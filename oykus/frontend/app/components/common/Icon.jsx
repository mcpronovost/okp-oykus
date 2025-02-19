import { Bell, Leaf } from "lucide-react-native";

export default function OkpIcon({ name, size, color }) {
  if (name === "bell") {
    return <Bell size={size} color={color || "inherit"} />;
  }
  return <Leaf name={name} size={size} color={color || "inherit"} />;
}
