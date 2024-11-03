import type { User } from "@/types/auth.types";
import { okpStore } from "./utils";

export const user = okpStore<User | null>("auth-user", null);