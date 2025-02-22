import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { RouterContext } from "@/services/router";
import { OkpText } from "@/components/common";

export default function OkpButton({ title, action, onPress }) {
  const { goBack } = useContext(RouterContext);

  const handlePress = () => {
    if (action === "goback") {
      goBack();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <OkpText>{title}</OkpText>
    </TouchableOpacity>
  );
}
