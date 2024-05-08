import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

const MAX_HEIGHT = 120;

export default function Footer({
  scrollYProgress,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const height = useMotionTemplate`${useTransform(
    scrollYProgress,
    [0.9, 1],
    [0, MAX_HEIGHT]
  )}px`;
  return <motion.footer id="footer" style={{ height }}>{children}</motion.footer>;
}
