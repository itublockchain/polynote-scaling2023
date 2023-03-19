import {
  Placement,
  autoUpdate,
  useFloating,
  shift,
} from "@floating-ui/react-dom";

type UsePopperProps = {
  strategy?: "fixed" | "absolute";
  topDistance?: number;
  leftDistance?: number;
  placement?: Placement;
};

/**
 * @dev Used for popper dropdowns
 */
export const usePopper = ({
  strategy = "fixed",
  placement = "bottom-start",
  topDistance = 0,
  leftDistance = 0,
}: UsePopperProps = {}) => {
  const {
    x,
    y,
    reference,
    floating,
    strategy: floatingStrategy,
  } = useFloating({
    middleware: [shift()],
    placement: placement,
    strategy: strategy,
    whileElementsMounted: autoUpdate,
  });

  const _top = placement.includes("bottom")
    ? (y || 0) + topDistance
    : (y || 0) - topDistance;

  const _left = placement.includes("right")
    ? (x || 0) + leftDistance
    : (x || 0) - leftDistance;

  const popperStyles = {
    left: _left,
    position: floatingStrategy,
    top: _top,
    zIndex: 10,
  };

  return { floating, popperStyles, reference };
};
