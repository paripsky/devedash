'use client';

import { Button, Group, InputLabel, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormSubmitButton } from "./FormSubmitButton";
import { ColorSwatchPicker } from "./ColorSwatchPicker";

export function AddDashboardForm({ onSave }: { onSave: (formData: FormData) => Promise<void> }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="New dashboard" centered>
        <form action={onSave}>
          <Stack>
            <TextInput data-autofocus id="name" name="name" label="Dashboard name" placeholder="Name" required />
            <Group>
              <InputLabel>Color</InputLabel>
              <ColorSwatchPicker name="color" defaultValue="blue" />
            </Group>
          </Stack>
          <Group mt="lg" justify="end">
            <FormSubmitButton onSubmitted={close}>Add</FormSubmitButton>
          </Group>
        </form>
      </Modal>
      <Button onClick={open}>New dashboard</Button>
    </>
  );
}
