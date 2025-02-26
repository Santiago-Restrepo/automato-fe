import { FC } from "react";

export const Summary: FC = async () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-normal text-2xl text-gray-300">
        Welcome to Automato
      </h1>
    </div>
  );
};
