"use client";

import Drawer from "react-modern-drawer";

interface NavDrawerProps {
  isOpen: boolean;
  toggle: () => void;
}

export function NavDrawer(props: NavDrawerProps) {
  const { isOpen, toggle } = props;
  return (
    <Drawer
      open={isOpen}
      onClose={toggle}
      direction="left"
      className="w-full bg-black"
      zIndex={1001}
    >
      Hi
    </Drawer>
  );
}
