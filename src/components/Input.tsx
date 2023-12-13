import { twMerge } from "tailwind-merge";

const DEFAULT_CLASSES = "rounded-md h-[35px] p-5";

export function Input(
  props: React.ComponentProps<"input">
) {
  const { className } = props;
  const classes = twMerge(
    DEFAULT_CLASSES,
    className
  );
  return <input {...props} className={classes} />;
}
