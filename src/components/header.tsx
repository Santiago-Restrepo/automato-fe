"use client";
import { FC, useState } from "react";
import { Workflow } from "lucide-react";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { signOut } from "next-auth/react";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      url: "/dashboard",
    },
    {
      name: "Flows",
      url: "flows",
    },
    {
      name: "Functions",
      url: "functions",
    },
    {
      name: "Settings",
      url: "settings",
    },
  ];

  const onPress = () => {
    signOut({
      redirect: true,
      redirectTo: "/login",
    });
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Workflow className="mr-2 h-6 sm:h-7" />
          <span className="font-medium text-xl">Automato</span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color="foreground" href={item.url}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="secondary" variant="flat" onPress={onPress}>
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.url}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
