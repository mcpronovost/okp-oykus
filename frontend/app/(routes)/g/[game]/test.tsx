"use client"

import { useRouter } from "next/navigation";

export default function TestCompnent() {
  const router = useRouter();

  return (
    <p>locale : {router.locale}</p>
  );
}
