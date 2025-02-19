import { View, Text } from "react-native";
import { layoutStyles } from "@/assets/style";

export default function OkpLayoutRightPanel() {
  const s = layoutStyles();

  return (
    <View style={s.rightPanel}>
      <Text style={s.rightPanelText}>rightPanel</Text>
      <Text style={s.rightPanelText}>rightPanel</Text>
      <Text style={s.rightPanelText}>rightPanel</Text>
    </View>
  );
}
