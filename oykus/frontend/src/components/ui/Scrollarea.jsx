import "@/assets/styles/ui/scrollarea.scss";
import { ScrollArea } from "radix-ui";

export default function OkpScrollarea({ children, id = "", className = "" }) {
  return (
    <ScrollArea.Root id={id} className={`okp-scrollarea ${className}`}>
      <ScrollArea.Viewport className="okp-scrollarea-viewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="okp-scrollarea-scrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="okp-scrollarea-thumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="okp-scrollarea-scrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="okp-scrollarea-thumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="okp-scrollarea-corner" />
    </ScrollArea.Root>
  );
}
