import { useEffect } from "react";
import { SandpackCodeEditor, SandpackFileExplorer, SandpackFiles, SandpackLayout, SandpackPredefinedTemplate, SandpackPreview, SandpackProvider, useSandpack } from '@codesandbox/sandpack-react';

export type EditorLayoutProps = {
  onChange: (files: SandpackFiles) => void;
  readonly?: boolean;
  actionsChildren?: JSX.Element;
}

export function EditorLayout({ onChange, readonly, actionsChildren }: EditorLayoutProps) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  return (<SandpackLayout>
    {!readonly && <SandpackFileExplorer />}
    {!readonly && <SandpackCodeEditor showTabs={false} />}
    <SandpackPreview showOpenInCodeSandbox={false} actionsChildren={actionsChildren} />
  </SandpackLayout>)
}

export type EditorProps = {
  files: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  onChange: (files: SandpackFiles) => void;
  readonly?: boolean;
  actionsChildren?: JSX.Element;
}

export function Editor({ onChange, files, template = 'react', readonly, actionsChildren }: EditorProps) {
  return <SandpackProvider
    theme="dark"
    template={template}
    files={files}
    options={{
      autoReload: false,
      classes: {
        "sp-layout": "sp-layout-override",
      },
      externalResources: ["https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"],
    }}
  >
    <EditorLayout onChange={onChange} readonly={readonly} actionsChildren={actionsChildren} />
  </SandpackProvider>
}