"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const onLogout = () => {
    startTransition(async () => {
      await authClient.signOut();
      router.refresh();
      router.push("/");
    });
  };

  return (
    <Button
      type="button"
      className="w-full"
      onClick={onLogout}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Logout"}
    </Button>
  );
}
