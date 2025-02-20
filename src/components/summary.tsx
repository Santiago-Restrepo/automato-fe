"use client";

import { useSession } from "next-auth/react";
import { FC } from "react";

export const Summary: FC = () => {
  const session = useSession();
  return <>{JSON.stringify(session)}</>;
};
