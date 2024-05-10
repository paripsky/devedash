import { ActionIcon, Group } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

export type EditModeButtons = {
  onSave: () => void;
  onCancel: () => void;
}

export function EditModeButtons({ onCancel, onSave }: EditModeButtons) {
  return (
    <Group gap={4} wrap="nowrap">
      <ActionIcon
        variant="default"
        onClick={onCancel}
      >
        <IconX size="1rem" />
      </ActionIcon>
      <ActionIcon
        variant="default"
        onClick={onSave}
      >
        <IconDeviceFloppy size="1rem" />
      </ActionIcon>
    </Group>
  );
}