import React, { forwardRef } from "react";
import clsx from "clsx";
import { FormControl } from "react-bootstrap";
import type chroma from "chroma-js";
import styles from "./Typography.module.css";

export function SurfaceComponent({
  elevated,
  className,
  ...props
}: {
  readonly elevated?: boolean;
} & React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        styles.surface,
        elevated && styles.surfaceElevated,
        className
      )}
    />
  );
}

export function TextComponent({
  type,
  small,
  className,
  ...props
}: {
  readonly type?: "primary" | "secondary" | "tertiary";
  readonly small?: boolean;
} & React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={clsx(
        styles.text,
        type === "secondary"
          ? styles.secondaryText
          : type === "tertiary"
          ? styles.tertiaryText
          : undefined,
        small && styles.smallText,
        className
      )}
    />
  );
}

export const Input = forwardRef(
  ({ className, ...props }: React.ComponentProps<typeof FormControl>, ref) => (
    <FormControl
      {...props}
      ref={ref}
      className={clsx(styles.input, className)}
    />
  )
);

export function Hr({ className, ...props }: React.ComponentProps<"hr">) {
  return <hr {...props} className={clsx(styles.hr, className)} />;
}

// Rating bubbles in search results list item and modal
export function RatingBubble({
  rating,
  colorMap,
  className,
  style,
  color,
  ...props
}: (
  | {
      readonly rating: number | null;
      readonly colorMap: chroma.Scale;
      readonly color?: never;
    }
  | {
      readonly rating?: never;
      readonly colorMap?: never;
      readonly color: string;
    }
) &
  React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        styles.ratingBubble,
        rating && styles.hasRating,
        className
      )}
      style={{
        ...style,
        backgroundColor:
          color ?? (rating ? colorMap(rating).alpha(1).css() : undefined),
      }}
    />
  );
}

// Primary Color link
export function LinkLikeText({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(styles.linkText, className)}
    />
  );
}

// Show Primary color on hover
export function HoverText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return <span {...props} className={clsx(styles.hoverText, className)} />;
}
