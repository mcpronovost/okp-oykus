import "@/assets/styles/ui/scrollarea.scss";
import { ScrollArea } from "radix-ui";

export default function OkpScrollarea({ children, enableHorizontal = false, enableVertical = true, id = "", className = "" }) {
  return (
    <ScrollArea.Root id={id} className={`okp-scrollarea ${className}`}>
      <ScrollArea.Viewport className="okp-scrollarea-viewport">
        {children}
      </ScrollArea.Viewport>
      {enableHorizontal && (
        <ScrollArea.Scrollbar
          className="okp-scrollarea-scrollbar"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="okp-scrollarea-thumb" />
        </ScrollArea.Scrollbar>
      )}
      {enableVertical && (
        <ScrollArea.Scrollbar
          className="okp-scrollarea-scrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="okp-scrollarea-thumb" />
        </ScrollArea.Scrollbar>
      )}
      <ScrollArea.Corner className="okp-scrollarea-corner" />
    </ScrollArea.Root>
  );
}
