import { Button } from "@mantine/core"
import { usePrevious } from "@mantine/hooks";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export type FormSubmitButtonProps = {
  children: JSX.Element | string;
  onSubmitted: () => void;
}

export function FormSubmitButton({ children, onSubmitted }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  const previousPending = usePrevious(pending);

  useEffect(() => {
    if (!pending && previousPending) {
      onSubmitted();
    }
  }, [pending, previousPending, onSubmitted]);

  return <Button type="submit" loading={pending}>{children}</Button>;
}