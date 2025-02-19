import Icon from "@react-native-vector-icons/lucide";

export default function OkpIcon({ name, size, color }) {
  return <Icon name={name} size={size} color={color || "inherit"} />;
}
