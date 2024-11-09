import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import Cookies from "js-cookie";
import { sideleftOpenStore } from "@/stores/storeWeb";

export function useSideleft (initialState: boolean = false) {
  const sideleftOpen = useStore(sideleftOpenStore);
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleSideleft = (newState: boolean) => {
    setIsOpen(!!newState);
    sideleftOpenStore.set(newState);
    Cookies.set("okp-web-sideleftOpen", String(newState), {
      path: "/",
      expires: 30,
      sameSite: "strict",
    });
  };

  useEffect(() => {
    setIsOpen(sideleftOpen ?? false);
  }, [sideleftOpen]);

  return { isOpen, setIsOpen, toggleSideleft };
}