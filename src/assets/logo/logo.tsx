import type { SVGAttributes } from "react";

/**
 * Eagle Taxi logo placeholder.
 * Real logo will be dropped in later — for now this renders a simple
 * wordmark so the header isn't empty. Keeps the same prop signature
 * as the original react-bits logo so callers (header.tsx) don't change.
 */
const Logo = (props: SVGAttributes<SVGElement>) => {
  const { className, ...rest } = props;
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-primary/10 text-primary"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          {...rest}
        >
          {/* Eagle Taxi mark — wing/road glyph */}
          <path d="M2 12h4l3-9 4 18 3-9h6" />
        </svg>
      </span>
      <span className="text-sm font-medium tracking-tight text-foreground">
        Eagle Taxi
      </span>
    </div>
  );
};

export default Logo;
