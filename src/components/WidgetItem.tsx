'use client';

import { formatTimeAgo } from '@/utils/date';
import { Editor } from './Editor';
import { Widget } from '@/types/Widget';
import { useState } from 'react';
import { ActionIcon, Card, CardSection, Group, Menu, Text, TextInput, Title, Tooltip, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconEdit, IconMenu2, IconTrash, IconX } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

type WidgetItemProps = {
  widget: Widget;
  updateWidget: (widget: Partial<Widget>) => Promise<void>;
  deleteWidget: (widgetId: string, dashboardId: string) => Promise<void>;
};

export function WidgetItem({ widget, updateWidget, deleteWidget }: WidgetItemProps) {
  const [editorKey, setEditorKey] = useState<string>(() => crypto.randomUUID());
  const [name, setName] = useState<Widget['name']>(widget.name ?? '');
  const [template, setTemplate] = useState<Widget['template']>(widget.template ?? 'react');
  const [files, setFiles] = useState<Widget['files']>(
    widget.files,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [wasUpdated, setWasUpdated] = useState(
    widget.updated_at && widget.created_at !== widget.updated_at,
  );
  const [date, setDate] = useState(
    wasUpdated ? widget.updated_at : widget.created_at,
  );

  const handleCancel = () => {
    setIsEditing(false);
    setName(widget.name);
    setFiles(widget.files);
    setEditorKey(crypto.randomUUID());
  };

  return (
    <Card withBorder shadow="sm" radius="md">
      <CardSection withBorder inheritPadding py="xs">
        <Group justify="space-between">
          {isEditing ? (<TextInput value={name} onChange={(e) => setName(e.target.value)} />) : (<Title order={4}>
            {name}
          </Title>)}
          <Group>
            <Text
              size="xs"
              suppressHydrationWarning
            >
              <Tooltip label={new Date(date).toString()}>
                <span suppressHydrationWarning>
                  {wasUpdated ? 'Updated' : 'Created'}{' '}
                  {formatTimeAgo(new Date(date))}
                </span>
              </Tooltip>
            </Text>
            {isEditing ? (
              <Group gap={4}>
                <ActionIcon
                  variant="default"
                  onClick={handleCancel}
                >
                  <IconX size="1rem" />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  onClick={async () => {
                    const id = notifications.show({
                      loading: true,
                      title: 'Saving...',
                      message: 'Saving widget',
                      autoClose: false,
                      withCloseButton: false,
                    });

                    try {
                      await updateWidget({
                        id: widget.id,
                        user_id: widget.user_id,
                        name,
                        template,
                        files,
                      })
                      setWasUpdated(true);
                      setDate(new Date().toString());
                      setIsEditing(false);

                      notifications.update({
                        id,
                        color: 'teal',
                        title: 'Saved successfully',
                        message: 'Your widget was saved!',
                        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                        loading: false,
                        autoClose: 2000,
                      });
                    } catch (error) {
                      notifications.update({
                        id,
                        color: 'red',
                        title: 'Something went wrong',
                        message: "Your widget couldn't be saved",
                        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
                        loading: false,
                        autoClose: 2000,
                      });
                    } finally {
                      setIsEditing(false);
                    }
                  }}
                >
                  <IconDeviceFloppy size="1rem" />
                </ActionIcon>
              </Group>
            ) : (<Menu shadow="md" position="bottom-end" offset={2}>
              <Menu.Target>
                <ActionIcon
                  variant="default"
                >
                  <IconMenu2 style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />} onClick={() => setIsEditing(true)}>
                  Edit
                </Menu.Item>
                <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} onClick={() => {
                  modals.openConfirmModal({
                    title: 'Delete widget',
                    centered: true,
                    children: (
                      <Text size="sm">
                        Are you sure you want to delete <b>&quot;{name}&quot;</b>? This action is destructive and you will have
                        to contact support to restore your data.
                      </Text>
                    ),
                    labels: { confirm: 'Delete widget', cancel: "Cancel" },
                    confirmProps: { color: 'red' },
                    onConfirm: () => deleteWidget(widget.id, widget.dashboard_id),
                  });
                }}>
                  Remove
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>)}
          </Group>
        </Group>
      </CardSection>
      <CardSection>
        <Editor
          key={editorKey}
          template={template}
          files={widget.files}
          onChange={setFiles}
          readonly={!isEditing}
        />
      </CardSection>
    </Card>
  );
}
