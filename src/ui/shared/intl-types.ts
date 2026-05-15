import type { ReactNode } from "react";
import type { PrimitiveType } from "react-intl";

export type MessageValue = PrimitiveType | ReactNode;

export type MessageValues = Record<string, MessageValue>;
