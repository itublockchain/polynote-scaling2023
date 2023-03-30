import { ComponentPropsWithoutRef, ReactNode, RefObject, useMemo } from "react";
import { Spinner } from "ui/Spinner/Spinner";
import { clsnm } from "utils/clsnm";

type ButtonColor = "primary" | "secondary" | "success" | "danger";
type ButtonSize = "small" | "medium" | "large" | "xlarge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  forwardedRef?: RefObject<HTMLButtonElement>;
  color: ButtonColor;
  className?: string;
  size?: ButtonSize;
  absolute?: boolean;
}

export function Button({
  loading,
  disabled,
  leftIcon,
  rightIcon,
  forwardedRef,
  className,
  children,
  color,
  size = "medium",
  absolute,
  ...props
}: ButtonProps) {
  const colorAndSizeClassNames = useButtonClassName(size, color);

  return (
    <button
      ref={forwardedRef}
      className={clsnm(
        `flex items-center rounded-lg outline-none justify-center hover:scale-102 duration-150 ${
          absolute ? "absolute" : "relative"
        } ${colorAndSizeClassNames}`,
        className,
        disabled && "pointer-events-none opacity-60 select-none",
        loading && "pointer-events-none cursor-wait"
      )}
      {...props}
    >
      {loading && <Spinner className="absolute" />}

      {leftIcon != null ? (
        <div
          className={clsnm(
            "text-base",
            children != null && "mr-2",
            loading && "opacity-0"
          )}
        >
          {leftIcon}
        </div>
      ) : null}
      <span className={clsnm(loading && "opacity-0", "font-medium")}>
        {children}
      </span>
      {rightIcon != null ? (
        <div
          className={clsnm(
            "text-base",
            children != null && "ml-2",
            loading && "opacity-0"
          )}
        >
          {rightIcon}
        </div>
      ) : null}
    </button>
  );
}

// helpers

export const useButtonClassName = (
  size: ButtonSize,
  color: ButtonColor
): string => {
  const colorAndSizeClassNames = useMemo((): string => {
    let arr: string[] = [];

    /**
     * Apply color styles
     */
    if (color === "primary") {
      arr = [
        "bg-buttonPrimaryBg",
        "hover:bg-buttonPrimaryBgHover",
        "text-buttonPrimaryColor",
        "hover:text-buttonPrimaryColorHover",
      ];
    } else if (color === "secondary") {
      arr = [
        "bg-buttonSecondaryBg",
        "hover:bg-buttonSecondaryBgHover",
        "text-buttonSecondaryColor",
        "hover:text-buttonSecondaryColorHover",
      ];
    } else if (color === "success") {
      arr = [
        "bg-buttonSuccessBg",
        "hover:bg-buttonSuccessBgHover",
        "text-buttonSuccessColor",
        "hover:text-buttonSuccessColorHover",
      ];
    } else if (color === "danger") {
      arr = [
        "bg-buttonDangerBg",
        "hover:bg-buttonDangerBgHover",
        "text-buttonDangerColor",
        "hover:text-buttonDangerColorHover",
      ];
    }

    return arr.join(" ");
  }, [color]);

  return colorAndSizeClassNames;
};
