import { FormattedMessage } from "react-intl";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface EnableToggleProps {
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly labelId?: MessageKey;
}

export function EnableToggle({
  checked,
  onChange,
  labelId = "employee.extras.toggle.enable",
}: EnableToggleProps) {
  return (
    <label className="qg-toggle">
      <input
        type="checkbox"
        className="qg-toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="qg-toggle__label">
        <FormattedMessage id={labelId} />
      </span>
    </label>
  );
}
