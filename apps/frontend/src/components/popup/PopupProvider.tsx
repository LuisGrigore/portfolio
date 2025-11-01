import { createContext, useCallback, useContext, useState, type FC, type ReactNode } from "react";
import { PopupList } from "./PopupList"; // 👈 importar el nuevo componente

type PopupType = "Success" | "Error" | "Info";

interface Popup {
  id: number;
  type: PopupType;
  message: string;
}

interface PopupContextType {
  showPopup: (popup: { type?: PopupType; message: string }) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [popups, setPopups] = useState<Popup[]>([]);

  const showPopup = useCallback(
    ({ type = "Info", message }: { type?: PopupType; message: string }) => {
      const id = Date.now();
      const newPopup: Popup = { id, type, message };
      setPopups((prev) => [...prev, newPopup]);

      if (type === "Success" || type === "Error") {
        setTimeout(() => {
          setPopups((prev) => prev.filter((p) => p.id !== id));
        }, 3000);
      }
    },
    []
  );

  const closePopup = useCallback((id: number) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <PopupList popups={popups} closePopup={closePopup} /> {/* 👈 aquí se usa */}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within a PopupProvider");
  return context;
};