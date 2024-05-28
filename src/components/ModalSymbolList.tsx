"use client";

import { useState, useEffect } from "react";
import SymbolList from "@/components/SymbolList";
import { Symbol } from "@/types/symbol";

interface ModalSymbolListProps {
  symbols: Symbol[];
  isOpen: boolean;
  onClose: () => void;
}

const ModalSymbolList = ({
  symbols,
  isOpen,
  onClose,
}: ModalSymbolListProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-bg-color bg-opacity-50 flex justify-center">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-lg">
        <SymbolList symbols={symbols} />
        <button
          className="bg-text-black text-white p-2 rounded-lg mt-4 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalSymbolList;
