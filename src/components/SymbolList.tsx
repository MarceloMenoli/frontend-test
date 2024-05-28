"use client";

import { useState } from "react";
import { Symbol } from "@/types/symbol";
import { useSymbolList } from "@/contexts/SymbolListContext";

interface SymbolListProps {
  symbols: Symbol[];
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }) => {
  const [temporarySelectedSymbols, setTemporarySelectedSymbols] = useState<
    string[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { symbolLists, addSymbolList } = useSymbolList();

  const handleAddSymbol = () => {
    if (symbolLists.length === 0) {
      alert("Please add a list before adding symbols.");
      return;
    }

    if (temporarySelectedSymbols.length === 0) {
      alert("Please select at least one symbol before adding to the list.");
      return;
    }

    addSymbolList(temporarySelectedSymbols);
    setTemporarySelectedSymbols([]);
  };

  const handleSymbolChange = (symbol: string) => {
    setTemporarySelectedSymbols((prevSelectedSymbols) => {
      if (prevSelectedSymbols.includes(symbol)) {
        return prevSelectedSymbols.filter((s) => s !== symbol);
      } else {
        return [...prevSelectedSymbols, symbol];
      }
    });
  };

  const handleSelectAll = () => {
    if (temporarySelectedSymbols.length === symbols.length) {
      setTemporarySelectedSymbols([]);
    } else {
      const allSymbols = symbols.map((symbol) => symbol.symbol);
      setTemporarySelectedSymbols(allSymbols);
    }
  };

  const isAllSelected = temporarySelectedSymbols.length === symbols.length;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <input
        className="text-text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        className="bg-tertiary text-white rounded py-2 px-4 hover:bg-opacity-30 transition duration-300 ease-in-out"
        onClick={handleAddSymbol}
      >
        Add to List
      </button>

      <ul className="bg-secondary rounded p-3 lg-custom:max-h-none lg-custom:overflow-visible max-h-screen overflow-auto">
        <li className="font-bold flex items-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="mr-2 w-4 h-4"
          />
          Symbol
        </li>
        {filteredSymbols?.map((symbol) => (
          <li key={symbol.symbol} className="my-3 flex items-center">
            <input
              type="checkbox"
              checked={temporarySelectedSymbols.includes(symbol.symbol)}
              onChange={() => handleSymbolChange(symbol.symbol)}
              className="mr-2 w-4 h-4"
            />
            {symbol.symbol}
          </li>
        ))}
      </ul>

      <div>
        {symbolLists.map((list, index) => (
          <div key={index}>
            <h3>List {index + 1}</h3>
            <ul>
              {list.map((symbol) => (
                <li key={symbol}>{symbol}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymbolList;
