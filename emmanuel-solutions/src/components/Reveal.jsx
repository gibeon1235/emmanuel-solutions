import { m } from "framer-motion";

/* One scroll-reveal primitive for the whole site.
   Replaces ~40 duplicated inline variant blocks. */

const EASE = [0.22, 1, 0.36, 1];

export const revealUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.72, ease: EASE }
  })
};

export function Reveal({ as = "div", index = 0, amount = 0.15, className, children, ...rest }) {
  const Tag = m[as] || m.div;
  return (
    <Tag
      className={className}
      variants={revealUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function MaskLine({ children, delay = 0, className }) {
  return (
    <span className="es-mask">
      <m.span
        className={className}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.82, ease: EASE }}
        style={{ display: "block" }}
      >
        {children}
      </m.span>
    </span>
  );
}
