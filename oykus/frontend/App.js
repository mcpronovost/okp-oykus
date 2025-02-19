import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useEffect, useState } from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";
import { v, layoutStyles } from "@/assets/style";
import OkpLayoutHeader from "@/components/layout/Header";
import OkpLayoutLeftPanel from "@/components/layout/LeftPanel";
import OkpLayoutRightPanel from "@/components/layout/RightPanel";
import Home from "@/screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Lucide: require("@react-native-vector-icons/lucide/fonts/Lucide.ttf"),
  });
  const s = layoutStyles();
  const { width } = useWindowDimensions();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setIsReady(true);
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={[s.core, !isReady && { opacity: 0 }]}>
      <OkpLayoutHeader />
      <View style={s.main}>
        {width >= v.breakpoints.sm && <OkpLayoutLeftPanel />}
        <View style={s.content}>
          <Home />
        </View>
        {width >= v.breakpoints.lg && <OkpLayoutRightPanel />}
      </View>
    </SafeAreaView>
  );
}
