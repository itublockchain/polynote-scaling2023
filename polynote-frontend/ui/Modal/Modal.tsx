import { ModalController } from "hooks/useModal";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { ComponentPropsWithoutRef, ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { clsnm } from "utils/clsnm";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: ReactNode;
  modalController: ModalController;
  closeOnClickOutside?: boolean;
  className?: string;
  bodyProps?: ComponentPropsWithoutRef<"div">;
  width?: string;
  showCloseIcon?: boolean;
};

const Modal = ({
  children,
  modalController,
  closeOnClickOutside = true,
  showCloseIcon = true,
  className,
  bodyProps = {},
  width = "320px",
}: ModalProps) => {
  const { isOpen, close } = modalController;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  const outsideRef = useOnClickOutside<HTMLDivElement>(() => {
    if (closeOnClickOutside) {
      close();
    }
  });

  return isOpen ? (
    <div
      style={{ animationTimingFunction: "linear" }}
      className={styles.layout}
    >
      <div
        {...bodyProps}
        ref={outsideRef}
        className={clsnm(styles.body, "bg-white dark:bg-MAIN_DARK", className)}
        style={{
          width: width,
          ...(bodyProps.style || {}),
        }}
      >
        {showCloseIcon && (
          <div
            onClick={close}
            className={clsnm(
              styles.close,
              "flex items-center align-center bg-neutral-100 hover:bg-gray-200 dark:bg-DARK_PURPLE hover:dark:bg-neutral-900 text-black dark:text-white rounded-full"
            )}
          >
            <IoMdClose />
          </div>
        )}
        {children}
      </div>
    </div>
  ) : null;
};

export { Modal };
