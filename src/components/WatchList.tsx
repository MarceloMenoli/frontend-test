import React, { useState, useEffect, useRef } from "react";
import { useSymbolList } from "@/contexts/SymbolListContext";
import { handleAddSymbols } from "@/helpers/handleAddSymbols";

interface WatchListItem {
  symbol: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  priceChangePercent: string;
}

const WatchList: React.FC = () => {
  const {
    symbolLists,
    setSelectedListIndex,
    selectedListIndex,
    addNewEmptyList,
  } = useSymbolList();
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedListIndex(Number(event.target.value));
  };

  const handleAddNewList = () => {
    addNewEmptyList();
  };

  useEffect(() => {
    if (selectedListIndex !== -1) {
      handleAddSymbols(
        symbolLists[selectedListIndex] || [],
        setWatchList,
        wsRef
      );
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedListIndex, symbolLists]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <select
          className="text-text-black min-w-24 h-10 w-full cursor-pointer rounded"
          id="watchlist-select"
          value={selectedListIndex}
          onChange={handleSelectChange}
        >
          <option value="-1" disabled>
            {symbolLists.length === 0 ? "No list available" : "Select a list"}
          </option>
          {symbolLists.map((list: string[], index: number) => (
            <option key={index} value={index}>
              List {index + 1}
            </option>
          ))}
        </select>
        <button
          className="bg-secondary h-6 w-6 rounded-full font-bold flex items-center justify-center"
          type="button"
          onClick={handleAddNewList}
        >
          +
        </button>
      </div>
      <table className="w-full text-center border-2 rounded">
        <thead className="h-10 bg-tertiary">
          <tr>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Bid Price</th>
            <th>Ask Price</th>
            <th>Price Change (%)</th>
          </tr>
        </thead>
        <tbody className="bg-secondary">
          {watchList.map((item) => (
            <tr className="h-10" key={item.symbol}>
              <td>{item.symbol}</td>
              <td>{item.lastPrice}</td>
              <td>{item.bidPrice}</td>
              <td>{item.askPrice}</td>
              <td>{item.priceChangePercent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
