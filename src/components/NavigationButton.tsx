import { Route } from "@/consts/interfaces";
import { twMerge } from "tailwind-merge";

interface NavigationButtonProps {
  route: Route;
  className?: string;
}

const DEFAULT_CLASSES = "block hover:bg-store-bg-100 text-4xl md:text-lg bold";

export function NavigationButton(props: NavigationButtonProps) {
  const {
    route: { url, displayValue },
    className = "",
  } = props;

  const classes = twMerge(DEFAULT_CLASSES, className);

  return (
    <a className={classes} href={url}>
      {displayValue}
    </a>
  );
}
