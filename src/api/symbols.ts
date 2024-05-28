import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
    const data = await response.json();
    const symbols = data.symbols.map((s: any) => ({
      symbol: s.symbol,
    }));
    res.status(200).json(symbols);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
