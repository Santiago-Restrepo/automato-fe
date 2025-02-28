import { FC } from "react";

export const Footer: FC = () => {
  const menu = [
    {
      name: "Privacy Policy",
      url: "#",
    },
    {
      name: "Terms & Conditions",
      url: "#",
    },
  ];
  return (
    <footer className="flex justify-between items-center p-2 border-t-1.5 border-gray-200 bg-white text-gray-500 fixed bottom-0 w-full">
      <small>Copyright © 2025 Automato. All rights reserved</small>

      <div className="flex gap-2">
        {menu.map((item, index) => (
          <a
            key={index}
            href={item.url}
            className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {item.name}
          </a>
        ))}
      </div>
    </footer>
  );
};
