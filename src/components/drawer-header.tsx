"use client";

import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import {
  Breadcrumbs,
  Link,
  ListItemButton,
  ListItemDecorator,
  Stack,
} from "@mui/joy";
import Home from "@mui/icons-material/Home";
import AirIcon from "@mui/icons-material/Air";
import LinkIcon from "@mui/icons-material/Link";
import TuneIcon from "@mui/icons-material/Tune";
import { usePathname } from "next/navigation";

export default function DrawerHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`; // "/flow" and then "/flow/5"
    return { label: segment, path };
  });
  const sections = [
    {
      url: "/",
      title: "Home",
      icon: Home,
    },
    {
      url: "/flow",
      title: "Flows",
      icon: AirIcon,
    },
    {
      url: "/integrations",
      title: "Integrations",
      icon: LinkIcon,
    },
    {
      url: "/settings",
      title: "Settings",
      icon: TuneIcon,
    },
  ];

  return (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<TuneIcon />}
          onClick={() => setOpen(true)}
        ></Button>
        <Breadcrumbs aria-label="breadcrumbs">
          {breadcrumbs.map((item) => (
            <Link key={item.path} color="neutral" href={item.path}>
              {item.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Stack>
      <Drawer
        size="sm"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Menu</DialogTitle>
          <ModalClose />

          <div>
            <List
              size="md"
              variant="outlined"
              sx={{ maxWidth: 300, borderRadius: "sm" }}
            >
              {sections.map((section) => (
                <ListItem key={section.title}>
                  <ListItemButton
                    component="a"
                    href={section.url}
                    onClick={() => setOpen(false)} // Close the drawer on navigation
                  >
                    <ListItemDecorator>
                      {section.icon && <section.icon />}
                    </ListItemDecorator>
                    {section.title}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
