"use client";

import { Burger, Group, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import Link from "next/link";
import { Divider } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { kanit } from "../_lib/font";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
// import LanguageSwitch from "./LanguageSwitch";

const links = [
  { link: "/", label: "Home" },
  { link: "/research", label: "Research" },
  { link: "/works", label: "Works" },
  { link: "/blog", label: "Blog" },
];

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
      close();
    });
  };

  const items = links.map((link) => {
    const isActive = pathname === link.link;

    return (
      <Link
        key={link.label}
        href={link.link}
        className={`block leading-none px-3 py-2 rounded-sm text-sm font-bold transition ${
          isActive
            ? "text-sky-600"
            : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
        }`}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Link href="/">
          <Group className="cursor-pointer">
            <Avatar src="/fuji.jpg" alt="it's me" size="sm" />
            <h1 className={`text-2xl text-gray-600 ${kanit.className}`}>
              Riku Kobayashi
            </h1>
          </Group>
        </Link>

        <Group>
          <Group ml={50} gap={5} visibleFrom="md">
            {items}
          </Group>
          {/* <LanguageSwitch /> */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="md"
            aria-label="Toggle navigation"
          />
          <Drawer
            opened={opened}
            onClose={close}
            title={
              <Link href="/">
                <Group className="cursor-pointer">
                  <Avatar src="/fuji.jpg" alt="it's me" size="sm" />
                  <h1 className={`text-xl text-gray-600 ${kanit.className}`}>
                    Riku Kobayashi
                  </h1>
                </Group>
              </Link>
            }
            padding="md"
            size="xs"
            overlayProps={{ opacity: 0.5, blur: 4 }}
          >
            <Divider my="sm" />
            <ScrollArea className="h-full">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/";
                    close();
                  }}
                  className="text-lg text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/research"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/research";
                    close();
                  }}
                  className="text-lg text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Research
                </Link>
                <Link
                  href="/works"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/works";
                    close();
                  }}
                  className="text-lg text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Works
                </Link>
                <Link
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/blog";
                    close();
                  }}
                  className="text-lg text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Blog
                </Link>
              </nav>
            </ScrollArea>
            <Divider my="sm" />
          </Drawer>
        </Group>
      </div>
    </header>
  );
}
