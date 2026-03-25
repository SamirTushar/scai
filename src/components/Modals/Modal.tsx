import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-[16px] font-bold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
