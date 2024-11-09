// import type { User } from "@/types/auth.types";
// import { useState, useEffect } from "react";
// import { useStore } from "@nanostores/react";
// import Cookies from "js-cookie";
// import { user } from "@/stores/storeAuth";

// export function useAuthUser() {
//   const $user = useStore(user);
//   const [isLoadingAuthUser, setIsLoadingAuthUser] = useState(false);

//   const doGetAuthUser = async (api: string) => {
//     setIsLoadingAuthUser(true);
//     try {
//       const response = await fetch(`${api}/auth/me/`, {
//         credentials: "include"
//       });
//       if (!response.ok) return;
//       const data = await response.json();
//       user.set(data);
//     } catch {
//       user.set(null);
//     } finally {
//       setIsLoadingAuthUser(false);
//     }
//   };

//   return { isLoadingAuthUser, setIsLoadingAuthUser, doGetAuthUser };
// }