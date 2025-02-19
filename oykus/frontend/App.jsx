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
import { getView } from "@/services/router";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });
  const s = layoutStyles();
  const { width } = useWindowDimensions();
  const [isReady, setIsReady] = useState(false);
  const [view, setView] = useState(null);

  useEffect(() => {
    async function loadView() {
      if (fontsLoaded) {
        setIsReady(true);
        const view = await getView();
        setView(view);
      }
    }
  
    loadView();
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider style={s.safeArea}>
      <SafeAreaView style={[s.safeProvider, !isReady && { opacity: 0 }]}>
        <StatusBar barStyle="light-content" backgroundColor={v.colours.layout.header.bg} />
        <View style={s.core}>
          <OkpLayoutHeader />
          <View style={s.main}>
            {width >= v.breakpoints.xs && <OkpLayoutLeftPanel />}
            <View style={s.content}>
              <Home view={view} />
            </View>
            {width >= v.breakpoints.lg && <OkpLayoutRightPanel />}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
