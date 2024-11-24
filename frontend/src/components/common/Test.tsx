import { useEffect } from "react";
import { authService } from "@/services/api";

export default function Test() {
  useEffect(() => {
    const ping = async () => {
      const pingResult = await authService.login("admin", "admin");
      console.log(pingResult);
    };
    ping();
  }, []);

	return <div>Test</div>;
}
