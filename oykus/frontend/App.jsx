import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { v, layoutStyles } from "@/assets/style";
import { RouterProvider } from "@/services/router";
import OkpLayout from "@/components/layout";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });
  const s = layoutStyles();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      if (fontsLoaded) {
        setIsReady(true);
      }
    }
  
    loadFonts();
  }, [fontsLoaded]);

  return (
    <RouterProvider>
      <SafeAreaProvider style={s.safeArea}>
        <SafeAreaView style={[s.safeProvider, !isReady && { opacity: 0 }]}>
          <StatusBar barStyle="light-content" backgroundColor={v.colours.layout.header.bg} />
          <OkpLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </RouterProvider>
  );
}
