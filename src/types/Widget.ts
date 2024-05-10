import { SandpackFiles, SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";

export type Widget = {
  id: string;
  user_id: string;
  name: string;
  template: SandpackPredefinedTemplate;
  files: SandpackFiles;
  created_at: string;
  updated_at: string;
  dashboard_id: string;
};
