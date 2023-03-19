import { ComponentPropsWithoutRef, ReactNode, RefObject } from "react";
import { Typography } from "ui/Typography/Typography";
import { clsnm } from "utils/clsnm";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  containerClassName?: string;
  containerRef?: RefObject<HTMLDivElement>;
  forwardedRef?: RefObject<HTMLInputElement> & any;
  extendHeight?: boolean;
  label?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
}

export function Input({
  className,
  containerClassName,
  forwardedRef,
  containerRef,
  extendHeight = false,
  label,
  error,
  icon,
  ...props
}: InputProps) {
  return (
    <div
      ref={containerRef}
      className={clsnm(
        "flex relative",
        containerClassName,
        (label != null || error != null) && "flex-col"
      )}
    >
      {icon != null && (
        <div className="absolute left-[12px] top-1/2 -translate-y-1/2 text-MAIN_DARK dark:text-PINK text-xl">
          {icon}
        </div>
      )}
      {label != null && (
        <>
          {typeof label === "string" ? (
            <Typography variant="body2" weight="medium" className="ml-1 mb-1">
              {label}
            </Typography>
          ) : (
            label
          )}
        </>
      )}
      <input
        ref={forwardedRef}
        className={clsnm(
          "outline-none w-full rounded-lg bg-transparent dark:bg-MAIN_DARK text-neutral-600 dark:text-neutral-200 border-PURPLE dark:border-DARK_PURPLE border-1 focus:border-blue-200 focus:shadow-input dark:focus:shadow-inputDark focus:duration-200",
          className,
          !extendHeight && "h-12",
          icon != null ? "p-4 pl-[40px]" : "p-4"
        )}
        {...props}
      />
      {error != null && (
        <>
          {typeof error === "string" ? (
            <Typography
              variant="caption"
              weight="medium"
              className="ml-1 mt-1 text-red-600 text-sm"
            >
              {error}
            </Typography>
          ) : (
            error
          )}
        </>
      )}
    </div>
  );
}
