import { useContext, createContext, useState } from "react";
import type { ReactNode } from "react";


 type size = "sm:w-[40%] w-[90%]"| "sm:w-[80%] w-[90%]"
type aspect = "aspect-2/3" | "aspect-16/9"

type valueType = {
    cover:string,
    size : size,
    aspect : aspect,
}
type PhotoContextType = {
  isOpend: boolean;
  value: valueType;
  open: () => void;
  close: () => void;
  setValue: (value: valueType) => void;
};

const photoContext = createContext<PhotoContextType | undefined>(undefined);

export const usePhoto = () => {
  const context = useContext(photoContext);
  if (!context) throw new Error("usePhoto must be used inside PhotoProvider");
  return context;
};

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<valueType>({ cover: "", size: "sm:w-[40%] w-[90%]", aspect: "aspect-2/3" });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <photoContext.Provider value={{ isOpend: isOpen, open, close, value, setValue }}>
      {children}
    </photoContext.Provider>
  );
};