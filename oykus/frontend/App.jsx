import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useEffect, useState } from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { v, layoutStyles } from "@/assets/style";
import OkpLayoutHeader from "@/components/layout/Header";
import OkpLayoutLeftPanel from "@/components/layout/LeftPanel";
import OkpLayoutRightPanel from "@/components/layout/RightPanel";
import Home from "@/screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });
  const s = layoutStyles();
  const { width } = useWindowDimensions();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("fontsLoaded", fontsLoaded);
    if (fontsLoaded) {
      setIsReady(true);
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider style={[s.safeArea, !isReady && { opacity: 0 }]}>
      <SafeAreaView style={s.safeProvider}>
        <StatusBar barStyle="light-content" backgroundColor={v.colours.layout.header.bg} />
        <View style={s.core}>
          <OkpLayoutHeader />
          <View style={s.main}>
            {width >= v.breakpoints.xs && <OkpLayoutLeftPanel />}
            <View style={s.content}>
              <Home />
            </View>
            {width >= v.breakpoints.lg && <OkpLayoutRightPanel />}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
