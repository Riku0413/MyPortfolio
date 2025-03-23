"use client";

import {
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";
import { ActionIcon, Group } from "@mantine/core";
import classes from "./Footer.module.css";
import { Avatar } from "@mantine/core";
import { kanit } from "../_lib/font";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/research", label: "Research" },
  { link: "/works", label: "Works" },
  { link: "/blog", label: "Blog" },
];

export default function Footer() {
  const items = links.map((link) => (
    // <Anchor
    //   c="dimmed"
    //   key={link.label}
    //   href={link.link}
    //   lh={1}
    //   onClick={(event) => event.preventDefault()}
    //   size="sm"
    // >
    //   {link.label}
    // </Anchor>
    <Link key={link.label} href={link.link}>
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group>
          <Avatar src="fuji.jpg" alt="it's me" size="sm" />
          <h1 className={`text-2xl text-gray-600 ${kanit.className}`}>
            Riku Kobayashi
          </h1>
        </Group>

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <a
            href="https://twitter.com/us_j31"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandX size={18} stroke={1.5} />
            </ActionIcon>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </a>
          <a
            href="https://github.com/Riku0413"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub size={18} stroke={1.5} />
            </ActionIcon>
          </a>
        </Group>
      </div>
    </div>
  );
}
