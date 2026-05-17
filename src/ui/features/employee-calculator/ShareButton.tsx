import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const FEEDBACK_MS = 1800;

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to selection-based fallback
    }
  }
  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand?.("copy") ?? false;
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

export function ShareButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  const onClick = useCallback(async () => {
    if (typeof window === "undefined") return;
    const ok = await copyToClipboard(window.location.href);
    setStatus(ok ? "copied" : "failed");
  }, []);

  const labelId =
    status === "copied"
      ? "share.button.copied"
      : status === "failed"
        ? "share.button.failed"
        : "share.button.idle";

  return (
    <button
      type="button"
      className="qg-share-button"
      onClick={onClick}
      data-status={status}
      aria-live="polite"
    >
      <FormattedMessage id={labelId} />
    </button>
  );
}
