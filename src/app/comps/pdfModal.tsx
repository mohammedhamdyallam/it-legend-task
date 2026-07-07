"use client";

// Icons
import { FaTimes } from "react-icons/fa";

// Types
type PdfModalProps = {
  isOpen: boolean;
  onClose: () => void;
  file: string;
};

export default function PdfModal({ isOpen, onClose, file }: PdfModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-white">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-3 text-white hover:bg-black"
            >
              <FaTimes />
            </button>

            <iframe src={file} className="h-full w-full" />
          </div>
        </div>
      )}
    </>
  );
}
