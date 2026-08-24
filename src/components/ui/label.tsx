import * as React from "react"

import { cn } from "@/lib/utils"

// Standard label primitive — uses the existing typography tokens, no new
// colors. The peer-disabled styling matches the shadcn/base-ui pattern across
// the project's other form primitives.
function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium text-foreground select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Label }
