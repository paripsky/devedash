'use client';

import { Badge, DefaultMantineColor, Popover, PopoverDropdown, PopoverTarget, ScrollArea, SimpleGrid, UnstyledButton, rem } from "@mantine/core";
import { useState } from "react";

export type ColorSwatchPickerProps = {
  defaultValue: DefaultMantineColor;
  name?: string;
}

const COLORS = ['gray', 'red', 'pink', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal'];
const VARIANTS = ['2', '4', '6', '8'];

export function ColorSwatchPicker({ defaultValue, name }: ColorSwatchPickerProps) {
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState(defaultValue);

  return (
    <>
      {name && <input type="hidden" name={name} value={color} />}
      <Popover opened={opened} onChange={setOpened} position="bottom-start">
        <PopoverTarget>
          <UnstyledButton display="flex" onClick={() => setOpened((o) => !o)}>
            <Badge w={rem(24)} h={rem(24)} styles={{ root: { border: '1px solid var(--mantine-color-dark-3)' } }} color={color} />
          </UnstyledButton>
        </PopoverTarget>
        <PopoverDropdown p={0}>
          <ScrollArea h={200} py={rem(4)} px={rem(8)}>
            <SimpleGrid cols={6} mr={rem(8)}>
              {COLORS.flatMap((color) => VARIANTS.map((variant) => `${color}.${variant}`)).map((color) => (
                <UnstyledButton key={color} onClick={() => {
                  setColor(color);
                  setOpened(false);
                }}>
                  <Badge w={rem(24)} h={rem(24)} styles={{ root: { border: '1px solid var(--mantine-color-dark-3)' } }} color={color} />
                </UnstyledButton>
              ))}
            </SimpleGrid>
          </ScrollArea>
        </PopoverDropdown>
      </Popover>
    </>
  );
}