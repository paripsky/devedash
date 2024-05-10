import { DefaultMantineColor } from "@mantine/core";

export type Dashboard = {
  id: string;
  name: string;
  color: DefaultMantineColor;
  updated_at: string;
  created_at: string;
};
