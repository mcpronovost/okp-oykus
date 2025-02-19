import { Platform } from "react-native";
import * as LucideNative from "lucide-react-native";
import * as LucideWeb from "lucide-react";

export default function OkpIcon({ name, size, color }) {
  const iconProps = Platform.OS === "web" ? {
    size: `${size}px`,
    stroke: color || "currentColor",
    strokeWidth: 1.5
  } : {
    size: size,
    color: color || "inherit",
    strokeWidth: 1.5
  };

  const Icons = Platform.OS === "web" ? LucideWeb : LucideNative;
  const IconComponent = Icons[name.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("")] || Icons.Leaf;

  return <IconComponent {...iconProps} />;
}
