import { GameProvider } from "@/stores/storeGame";

export default function OkpProviders ({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
