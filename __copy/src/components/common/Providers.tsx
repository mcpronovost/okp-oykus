import { WebProvider } from "@/_libs/store/storeWeb";
import { RouteProvider } from "@/_libs/store/storeRoute";
import { GameProvider } from "@/_libs/store/storeGame";

export default function OkpProviders ({ children }: { children: React.ReactNode }) {
  return (
    <WebProvider>
      <RouteProvider>
        <GameProvider>{children}</GameProvider>
      </RouteProvider>
    </WebProvider>
  );
}
