import * as React from "react";
import { clsnm } from "utils/clsnm";

import styles from "./Typography.module.scss";

type TypographyVariants =
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "title5"
  | "headline"
  | "body1"
  | "body2"
  | "caption";

type TypographyWeights = "semibold" | "medium" | "regular";

type TypographyOwnProps = {
  as?: React.ElementType;
  variant: TypographyVariants;
  weight?: TypographyWeights;
  decor?: "underline";
  color?: string;
  style?: React.CSSProperties;
};

export type TypographyProps = TypographyOwnProps &
  Omit<React.AllHTMLAttributes<any>, keyof TypographyOwnProps>;

const Typography = React.forwardRef((props: TypographyProps, ref) => {
  const {
    variant,
    weight,
    decor,
    as: Component = "span",
    className,
    children,
    style,
    color,
    ...rest
  } = props;

  return (
    <Component
      ref={ref}
      className={clsnm(
        styles[variant],
        weight && styles[weight],
        decor && styles[decor],
        className
      )}
      style={{ ...style, color }}
      {...rest}
    >
      {children}
    </Component>
  );
});

Typography.displayName = "Typography";

export { Typography };
