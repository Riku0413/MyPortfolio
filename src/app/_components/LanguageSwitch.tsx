'use client';

import { useState, useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { useLanguage, Language } from '../contexts/LanguageContext';
import images from './images';
import classes from './LanguagePicker.module.css';

const data = [
  { label: '日本語', image: images.japanese, value: 'ja' as Language },
  { label: 'English', image: images.english, value: 'en' as Language },
];

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const [opened, setOpened] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selected = data.find((item) => item.value === language) || data[0];

  const items = data.map((item) => (
    <Menu.Item
      leftSection={
        <Group gap="xs">
          <Image src={item.image} w={20} h={20} />
        </Group>
      }
      onClick={() => setLanguage(item.value)}
      key={item.value}
    >
      {item.label}
    </Menu.Item>
  ));

  if (!isMounted) {
    return null;
  }

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} w={20} h={20} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
} 