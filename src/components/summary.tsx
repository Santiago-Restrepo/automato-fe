import { auth } from "@/auth";
import { FC } from "react";

export const Summary: FC = async () => {
  const session = await auth();
  return <p>{session?.user ? "Logged in" : "Not logged in"}</p>;
};
