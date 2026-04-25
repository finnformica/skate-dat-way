import { motion } from "motion/react";
import React, { type ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const HIDDEN = { clipPath: "inset(0 0 100% 0)", y: 16 };
const VISIBLE = { clipPath: "inset(0 0 0 0)", y: 0 };

const STAGGER_HIDDEN = { opacity: 0, y: 8 };
const STAGGER_VISIBLE = { opacity: 1, y: 0 };

type Props = {
  children: ReactNode;
  /** Children render with a small staggered fade-up. */
  stagger?: boolean;
  className?: string;
  /** External trigger override — when defined, controls visibility directly
   *  (used by Hero to flip in sync with the BootLoader). When undefined,
   *  the component reveals itself when scrolled into view via whileInView. */
  show?: boolean;
};

export function Reveal({ children, stagger, className, show }: Props) {
  const externallyControlled = show !== undefined;

  const viewport = { once: true, amount: "some" } as const;

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial={STAGGER_HIDDEN}
        {...(externallyControlled
          ? { animate: show ? STAGGER_VISIBLE : STAGGER_HIDDEN }
          : { whileInView: STAGGER_VISIBLE, viewport })}
        transition={{ duration: 0.42, ease: EASE_OUT }}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            initial={STAGGER_HIDDEN}
            {...(externallyControlled
              ? { animate: show ? STAGGER_VISIBLE : STAGGER_HIDDEN }
              : { whileInView: STAGGER_VISIBLE, viewport })}
            transition={{
              duration: 0.42,
              ease: EASE_OUT,
              delay: 0.06 * i,
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={HIDDEN}
      {...(externallyControlled
        ? { animate: show ? VISIBLE : HIDDEN }
        : { whileInView: VISIBLE, viewport })}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
