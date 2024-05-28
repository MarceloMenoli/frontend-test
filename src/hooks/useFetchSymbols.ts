import { useState, useEffect } from "react";
import { Symbol } from "@/types/symbol";

const useFetchSymbols = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch symbols");
        }
        const data = await response.json();
        setSymbols(data.symbols);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
  }, []);

  return { symbols, loading, error };
};

export default useFetchSymbols;
