import { ComponentPropsWithoutRef, CSSProperties, RefObject } from "react";
import { clsnm } from "utils/clsnm";
import styles from "./Container.module.scss";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  width?: number;
  className?: string;
  styles?: CSSProperties;
  forwardedRef?: RefObject<HTMLDivElement>;
}

const Container = ({
  children,
  width = 1280,
  style,
  className,
  forwardedRef,
}: ContainerProps) => {
  return (
    <div
      ref={forwardedRef}
      className={clsnm(styles.container, className)}
      style={{
        ...style,
        width: style?.width ?? width,
      }}
    >
      {children}
    </div>
  );
};

export { Container };
