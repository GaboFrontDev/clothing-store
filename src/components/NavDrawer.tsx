"use client";

import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import { Routes } from "./Routes";

interface NavDrawerProps {
  toggle?: () => void;
}

export function NavDrawer(props: NavDrawerProps) {
  const [mount, setMount] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!mount) {
      document.getElementById('menu-feature')?.addEventListener('click', () => {
        setOpen(!open);
      })
      setMount(true);
    }
  }, [mount, open])

  return (
    <>
      {mount && <Drawer
        open={open}
        onClose={() => setOpen(false)}
        direction="left"
        className="w-full bg-store-bg-100"
        zIndex={1001}
      >
        <section className="col-span-3 p-2 my-2 flex flex-col justify-center h-full">
          <Routes />
        </section>

      </Drawer>}
    </>
  );
}
