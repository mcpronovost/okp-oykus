import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { SafeAreaView, View, Text, useWindowDimensions } from "react-native"
import { layoutStyles } from "@/assets/style";
import OkpLayoutHeader from "@/components/layout/Header";
import Home from "@/screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });
  const s = layoutStyles();
  const { width } = useWindowDimensions();
  const isSidebarVisible = width >= 767;

  return (
    <SafeAreaView style={s.core}>
      <OkpLayoutHeader />
      <View style={s.main}>
        {isSidebarVisible && (
          <View style={s.leftPanel}>
            <Text style={s.leftPanelText}>leftPanel</Text>
            <Text style={s.leftPanelText}>leftPanel</Text>
            <Text style={s.leftPanelText}>leftPanel</Text>
          </View>
        )}
        <View style={s.content}>
          <Home />
        </View>
        {isSidebarVisible && (
          <View style={s.rightPanel}>
            <Text style={s.rightPanelText}>rightPanel</Text>
            <Text style={s.rightPanelText}>rightPanel</Text>
            <Text style={s.rightPanelText}>rightPanel</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
