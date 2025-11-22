import { type FC } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

type PopupType = "Success" | "Error" | "Info";

interface Popup {
  id: number;
  type: PopupType;
  message: string;
}

interface PopupListProps {
  popups: Popup[];
  closePopup: (id: number) => void;
}

export const PopupList: FC<PopupListProps> = ({ popups, closePopup }) => {
  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 flex flex-col items-center sm:items-end space-y-3 z-50">
      {popups.map((popup) => (
        <div
          key={popup.id}
          className={`flex items-start sm:items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-lg backdrop-blur-md text-white transition-all duration-300 w-full sm:w-auto max-w-sm sm:max-w-md animate-in fade-in slide-in-from-bottom-2 ${
            popup.type === "Success"
              ? "bg-linear-to-r from-emerald-500 to-emerald-600 shadow-emerald-400/30"
              : popup.type === "Error"
              ? "bg-linear-to-r from-rose-500 to-rose-600 shadow-rose-400/30"
              : "bg-linear-to-r from-sky-500 to-indigo-500 shadow-indigo-400/30"
          }`}
        >
          <div className="flex items-center justify-center shrink-0 w-6 h-6 sm:w-7 sm:h-7 mt-1 sm:mt-0">
            {popup.type === "Success" && <CheckCircle className="text-white" size={22} />}
            {popup.type === "Error" && <XCircle className="text-white" size={22} />}
            {popup.type === "Info" && <Info className="text-white" size={22} />}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-sm sm:text-base wrap-break-word">
              {popup.message}
            </span>
          </div>

          <button
            onClick={() => closePopup(popup.id)}
            className="shrink-0 text-white/70 hover:text-white transition-colors ml-2"
          >
            <XCircle size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
