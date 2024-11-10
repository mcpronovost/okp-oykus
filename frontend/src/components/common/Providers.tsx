import { WebProvider } from "@/_libs/store/storeWeb";
import { GameProvider } from "@/_libs/store/storeGame";

export default function OkpProviders ({ children }: { children: React.ReactNode }) {
  return (
    <WebProvider>
      <GameProvider>{children}</GameProvider>
    </WebProvider>
  );
}
