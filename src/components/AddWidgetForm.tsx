'use client';

import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FormSubmitButton } from './FormSubmitButton';
import { Widget } from '@/types/Widget';
import { EmptyState } from './EmptyState';

const templateOptions = [
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'react-ts',
    label: 'React Typescript',
  },
  {
    value: 'vue',
    label: 'Vue',
  },
  {
    value: 'vue-ts',
    label: 'Vue Typescript',
  },
  {
    value: 'solid',
    label: 'Solid',
  },
  {
    value: 'svelte',
    label: 'Svelte',
  },
  {
    value: 'vanilla',
    label: 'Vanilla',
  },
  {
    value: 'vanilla-ts',
    label: 'Vanilla Typescript',
  },
]

export function AddWidgetForm({ onSave, dashboardId, widgets }: { onSave: (formData: FormData) => Promise<void>; dashboardId: string; widgets: Widget[] }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="New widget" centered>
        <form action={onSave}>
          <input type="hidden" name="dashboardId" value={dashboardId} />
          <Stack>
            <TextInput data-autofocus id="name" name="name" placeholder="Name" required />
            <Select name="template" data={templateOptions} defaultValue="react" label="Template" />
          </Stack>
          <Group mt="lg" justify="end">
            <FormSubmitButton onSubmitted={close}>Add</FormSubmitButton>
          </Group>
        </form>
      </Modal>
      <Group justify="end">
        <Button onClick={open}>New widget</Button>
      </Group>
      {!widgets.length && (<EmptyState title="This dashboard is empty" actionText="Add a widget" onClick={open} />)}
    </>
  );
}
