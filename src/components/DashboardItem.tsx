'use client';

import type { Dashboard } from "@/types/Dashboard";
import { formatTimeAgo } from "@/utils/date";
import { Text, Card, Group, rem, Button, ColorSwatch, Badge, Menu, ActionIcon, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconEdit, IconMenu2, IconTrash, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { EditModeButtons } from "./EditModeButtons";
import { notifications } from "@mantine/notifications";

export type DashboardItemProps = {
  dashboard: Dashboard;
  updateDashboard: (dashboard: Partial<Dashboard>) => Promise<void>;
  deleteDashboard: (dashboardId: string) => Promise<void>;
}

export function DashboardItem({ dashboard, updateDashboard, deleteDashboard }: DashboardItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dashboard.name);
  const [color, setColor] = useState(dashboard.color);
  const [wasUpdated, setWasUpdated] = useState(
    dashboard.updated_at && dashboard.created_at !== dashboard.updated_at,
  );
  const [date, setDate] = useState(
    wasUpdated ? dashboard.updated_at : dashboard.created_at,
  );

  const handleCancel = () => {
    setIsEditing(false);
    setName(dashboard.name);
    setColor(dashboard.color);
  };

  const handleSave = async () => {
    const id = notifications.show({
      loading: true,
      title: 'Saving...',
      message: 'Saving dashboard',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await updateDashboard({
        id: dashboard.id,
        name,
        color,
      })
      setWasUpdated(true);
      setDate(new Date().toString());
      setIsEditing(false);

      notifications.update({
        id,
        color: 'teal',
        title: 'Saved successfully',
        message: 'Your dashboard was saved!',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
      });
    } catch (error) {
      notifications.update({
        id,
        color: 'red',
        title: 'Something went wrong',
        message: "Your dashboard couldn't be saved",
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
      });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="start" wrap="nowrap">
        {isEditing ? <TextInput value={name} onChange={(e) => setName(e.target.value)} /> : (<Text h={rem(36)} fw={500}>{name}</Text>)}
        {isEditing ? (<EditModeButtons onCancel={handleCancel} onSave={handleSave} />) : (
          <Menu shadow="md" position="bottom-end" offset={2}>
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
                  title: 'Delete dashboard',
                  centered: true,
                  children: (
                    <Text size="sm">
                      Are you sure you want to delete <b>&quot;{name}&quot;</b>? This action is destructive and you will have
                      to contact support to restore your data.
                    </Text>
                  ),
                  labels: { confirm: 'Delete dashboard', cancel: "Cancel" },
                  confirmProps: { color: 'red' },
                  onConfirm: () => deleteDashboard(dashboard.id),
                });
              }}>
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>

      <Text size="sm" c="dimmed" flex="1" py={rem(8)}>
        Last updated {formatTimeAgo(new Date(date))}
      </Text>

      <Button component={Link} color={color} fullWidth mt="md" radius="md" href={`/app/dashboards/${dashboard.id}`}>
        Go to dashboard
      </Button>
    </Card>
  );
}