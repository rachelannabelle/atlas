import * as React from "react";
import { filterFigmaProps } from "./utils";

/**
 * A plain <button> wrapper that strips _fg* props before they reach the DOM.
 * Use this instead of raw <button> as a child of Radix asChild triggers
 * (DropdownMenuTrigger, PopoverTrigger, etc.) to prevent React warnings.
 */
export const SafeButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  return <button ref={ref} {...filterFigmaProps(props)} />;
});
SafeButton.displayName = "SafeButton";

/**
 * A plain <div> wrapper that strips _fg* props before they reach the DOM.
 */
export const SafeDiv = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>((props, ref) => {
  return <div ref={ref} {...filterFigmaProps(props)} />;
});
SafeDiv.displayName = "SafeDiv";
