import { Dispatch, SetStateAction, MutableRefObject } from 'react';

interface WatchListItem {
  symbol: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  priceChangePercent: string;
}

export const handleAddSymbols = (
  symbols: string[],
  setWatchList: Dispatch<SetStateAction<WatchListItem[]>>,
  wsRef: MutableRefObject<WebSocket | null>
) => {
  const newItems: WatchListItem[] = symbols.map((symbol) => ({
    symbol,
    lastPrice: "0",
    bidPrice: "0",
    askPrice: "0",
    priceChangePercent: "0",
  }));

  setWatchList(newItems);

  if (wsRef.current) {
    wsRef.current.close();
  }

  const streams = symbols
    .map((symbol) => `${symbol.toLowerCase()}@ticker`)
    .join("/");
  const ws = new WebSocket(
    `wss://data-stream.binance.com/stream?streams=${streams}`
  );
  wsRef.current = ws;

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data).data;
    setWatchList((prevList) =>
      prevList.map((item) =>
        item.symbol === data.s.toUpperCase()
          ? {
              ...item,
              lastPrice: data.c,
              bidPrice: data.b,
              askPrice: data.a,
              priceChangePercent: data.P,
            }
          : item
      )
    );
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };

  return () => {
    ws.close();
  };
};
