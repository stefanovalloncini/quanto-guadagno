import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "feature" | "available" | "soon";

interface TileBase {
  readonly variant: Variant;
  readonly title: ReactNode;
  readonly badge?: ReactNode;
  readonly children: ReactNode;
}

interface TileLink extends TileBase {
  readonly variant: "feature" | "available";
  readonly to: string;
  readonly cta?: ReactNode;
}

interface TileSoon extends TileBase {
  readonly variant: "soon";
  readonly to?: never;
  readonly cta?: never;
}

type TileProps = TileLink | TileSoon;

export function Tile(props: TileProps) {
  const { variant, title, badge, children } = props;

  const body = (
    <>
      {badge !== undefined && <span className="qg-tile__badge">{badge}</span>}
      <h2 className="qg-tile__title">{title}</h2>
      <div className="qg-tile__body">{children}</div>
    </>
  );

  if (props.variant === "soon") {
    return <div className="qg-tile qg-tile--soon">{body}</div>;
  }

  const { to, cta } = props;

  return (
    <Link to={to} className={`qg-tile qg-tile--${variant}`}>
      {body}
      {cta !== undefined && (
        <span className="qg-tile__cta" aria-hidden="true">
          {cta}
        </span>
      )}
    </Link>
  );
}
