import { useContext } from "react";
import { View, useWindowDimensions } from "react-native";

import { v, layoutStyles } from "@/assets/style";
import { RouterContext } from "@/services/router";
import OkpLayoutHeader from "@/components/layout/Header";
import OkpLayoutLeftPanel from "@/components/layout/LeftPanel";
import OkpLayoutRightPanel from "@/components/layout/RightPanel";
import Error404 from "@/screens/Error404";

export default function OkpLayout() {
  const { isReadyRouter, screen } = useContext(RouterContext);
  const s = layoutStyles();
  const { width } = useWindowDimensions();

  if (!isReadyRouter) {
    return null;
  }

  return (
    <View style={s.core}>
      <OkpLayoutHeader />
      <View style={s.main}>
        {width >= v.breakpoints.xs && <OkpLayoutLeftPanel />}
        <View style={s.content}>
          {screen || <Error404 />}
        </View>
        {width >= v.breakpoints.lg && <OkpLayoutRightPanel />}
      </View>
    </View>
  );
}
