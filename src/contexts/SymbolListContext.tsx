"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SymbolListContextProps {
  symbolLists: string[][];
  addSymbolList: (symbolList: string[]) => void;
  addNewEmptyList: () => void;
  selectedListIndex: number;
  setSelectedListIndex: Dispatch<SetStateAction<number>>;
}

const SymbolListContext = createContext<SymbolListContextProps | undefined>(
  undefined
);

export const SymbolListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [symbolLists, setSymbolLists] = useState<string[][]>([]);
  const [selectedListIndex, setSelectedListIndex] = useState<number>(-1);

  const addSymbolList = (symbolList: string[]) => {
    setSymbolLists((prevLists) => {
      const newLists = [...prevLists];
      if (selectedListIndex !== -1) {
        newLists[selectedListIndex] = [
          ...newLists[selectedListIndex],
          ...symbolList,
        ];
      }
      return newLists;
    });
  };

  const addNewEmptyList = () => {
    setSymbolLists((prevLists) => [...prevLists, []]);
    setSelectedListIndex(symbolLists.length);
  };

  return (
    <SymbolListContext.Provider
      value={{
        symbolLists,
        addSymbolList,
        addNewEmptyList,
        selectedListIndex,
        setSelectedListIndex,
      }}
    >
      {children}
    </SymbolListContext.Provider>
  );
};

export const useSymbolList = (): SymbolListContextProps => {
  const context = useContext(SymbolListContext);
  if (!context) {
    throw new Error("useSymbolList must be used within a SymbolListProvider");
  }
  return context;
};
