<<<<<<< HEAD
# Process

Fork the repository into your account. Once your code is ready open a pull-request on this repository and we will review it.

# Introduction

The aim of the test is to develop a mini-application for managing a Binance websocket pricing update.

1. The appliction should consume this endpoint `GET` https://api.binance.com/api/v3/exchangeInfo and list it. 
2. Users should be able create a list of symbols.
3. Users should be able to add symbols to a list for watching the last price updates, best bid price, best ask price and price change percent.
   1. For that, the application should connect to a websocket using the symbols previously selected by the user.
   2. The update should occur in almost near real time.
   3. Use the following url for connection to the websocket. wss://data-stream.binance.com/stream?streams={symbol}/{symbol}
      1. Example: wss://data-stream.binance.com/stream?streams=ethbtc/bnbbtc

Websocket sample response:
```
{
  "e": "24hrTicker",  // Event type
  "E": 123456789,     // Event time
  "s": "BNBBTC",      // Symbol
  "p": "0.0015",      // Price change
  "P": "250.00",      // Price change percent
  "w": "0.0018",      // Weighted average price
  "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
  "c": "0.0025",      // Last price
  "Q": "10",          // Last quantity
  "b": "0.0024",      // Best bid price
  "B": "10",          // Best bid quantity
  "a": "0.0026",      // Best ask price
  "A": "100",         // Best ask quantity
  "o": "0.0010",      // Open price
  "h": "0.0025",      // High price
  "l": "0.0010",      // Low price
  "v": "10000",       // Total traded base asset volume
  "q": "18",          // Total traded quote asset volume
  "O": 0,             // Statistics open time
  "C": 86400000,      // Statistics close time
  "F": 0,             // First trade ID
  "L": 18150,         // Last trade Id
  "n": 18151          // Total number of trades
}
````

# Technical Requirements

- React 14+
- Use context for data flow
- Must be responsive
- Typescript
- Usage of functional components

# Bonus
- unit-tests for the UI
- integration-test (one (or more) just in order to show that you know what is it (: )

# Docs
  
Binance documentation:
- https://binance-docs.github.io/apidocs/spot/en/#introduction

UI Sample to use as a guide:
![Screenshot 2023-03-15 at 10 51 49](https://user-images.githubusercontent.com/20883536/225329370-30ff8f83-7493-4b91-9ae1-561b6fe6bda3.png)
=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> 5496786 (Initial commit from Create Next App)
