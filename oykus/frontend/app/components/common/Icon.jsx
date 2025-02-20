import { Platform } from "react-native";
import * as LucideNative from "lucide-react-native";
import * as LucideWeb from "lucide-react";
import { v } from "@/assets/style";

export default function OkpIcon({ name, size, color, stroke }) {
  const iconProps = Platform.OS === "web" ? {
    size: `${size}px`,
    stroke: color || "currentColor",
    strokeWidth: stroke || 1.5
  } : {
    size: size,
    color: color || v.colours.fg,
    strokeWidth: stroke || 1.5
  };

  const Icons = Platform.OS === "web" ? LucideWeb : LucideNative;
  const IconComponent = Icons[name.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("")] || Icons.Leaf;

  return <IconComponent {...iconProps} />;
}
