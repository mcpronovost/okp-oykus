import WebProvider from "@/_libs/stores/ContextWeb";

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <WebProvider>
      {children}
    </WebProvider>
  );
}
