import { useContext, createContext, useState } from "react";
import type { ReactNode } from "react";

type valueType = {
  media_type: "movie" | "tv";
  id: number;
};

type openContextType = {
  isOpend: boolean;
  value: valueType;
  open: () => void;
  close: () => void;
  setValue: (value: valueType) => void;
};

const openContext = createContext<openContextType | undefined>(undefined);

export const useOpen = () => {
  const context = useContext(openContext);
  if (!context) throw new Error("useBoolean must be used inside BooleanProvider");
  return context;
};

export const OpenProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<valueType>({ media_type: "movie", id: 0 });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <openContext.Provider value={{ isOpend: isOpen, open, close, value, setValue }}>
      {children}
    </openContext.Provider>
  );
};