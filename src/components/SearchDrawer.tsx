"use client";

import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";

export function SearchDrawer() {
  const [mount, setMount] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!mount) {
      window.document.getElementById('search-feature')?.addEventListener('click', () => {
        setOpen(!open);
      });
      window.document.getElementById('search-feature-mobile')?.addEventListener('click', () => {
        setOpen(!open);
      });
      setMount(true)
    }
  }, [mount, open])
  return (
    <>
      {mount && <Drawer
        open={open}
        onClose={() => setOpen(false)}
        direction="top"
        className="w-full bg-black"
        zIndex={1001}
      >
        Feature in progress.
      </Drawer>}
    </>
  );
}
