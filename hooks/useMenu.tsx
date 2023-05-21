import { useState } from "react";

export const useMenu = (isOpen = false) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen(state => !state);
  };

  return { open, openMenu, closeMenu, toggleMenu };
};
