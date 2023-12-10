import { twMerge } from "tailwind-merge";

const BUTTON_CLASSES = "mx-2 p-2 border-2 border-store-bg-100 bg-white";

function Button(props: React.ComponentProps<"button">) {
  const { className } = props;
  const classes = twMerge(BUTTON_CLASSES, className);
  return (
    <button {...props} className={classes}>
      {props.children}
    </button>
  );
}

function Link(props: React.ComponentProps<"a">) {
  const { className } = props;
  const classes = twMerge(BUTTON_CLASSES, className);
  return (
    <a {...props} className={classes}>
      {props.children}
    </a>
  );
}

const object = {
  Button,
  Link,
};

export default object;
