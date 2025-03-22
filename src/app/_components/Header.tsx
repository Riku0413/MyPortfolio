"use client";

import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Group, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import Link from "next/link";
import { Divider } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { kanit } from "../_lib/font";

const links = [
  { link: "/", label: "Home" },
  { link: "/research", label: "Research" },
  { link: "/works", label: "Works" },
  { link: "/blog", label: "Blog" },
];

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  // <Link href="/" onClick={close} className="text-lg hover:underline">
  //   Home
  // </Link>;
  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* <MantineLogo size={28} /> */}
          <Avatar src="fuji.jpg" alt="it's me" size="sm" />
          <h1 className={`text-2xl text-gray-600 ${kanit.className}`}>
            Riku Kobayashi
          </h1>
        </Group>

        <Group>
          {/* <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            // visibleFrom="xs"
          /> */}
          <Group ml={50} gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group>
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
            title="Portfolio"
            padding="md"
            size="xs"
            overlayProps={{ opacity: 0.5, blur: 4 }}
          >
            <Divider my="sm" />
            <ScrollArea className="h-full">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={close}
                  className="text-lg hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/research"
                  onClick={close}
                  className="text-lg hover:underline"
                >
                  Research
                </Link>
                <Link
                  href="/works"
                  onClick={close}
                  className="text-lg hover:underline"
                >
                  Works
                </Link>
                <Link
                  href="/blog"
                  onClick={close}
                  className="text-lg hover:underline"
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
