import { signOut } from "@/auth";
import { Button } from "@heroui/react";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button color="secondary" variant="flat" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
