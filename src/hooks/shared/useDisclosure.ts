import { useCallback, useState } from 'react';

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const set = useCallback((value: boolean) => setIsOpen(value), []);

  return { isOpen, open, close, toggle, set } as const;
};
