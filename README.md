---

# Trading Bot Simulation

## Overview

This project implements a simple trading bot that simulates trading in a hypothetical stock market. The bot monitors stock prices, executes trades based on prelkdefined strategies, and tracks its performance metrics, including profit/loss. It serves as a practical example of how to handle stock trading logic programmatically.

## Features

- **Continuous Monitoring**: Periodically fetches stock prices using mock data.
- **Trading Strategy**:
  - Buys when the stock price drops by 3%.
  - Sells when the stock price rises by 5% or drops by 3%.
- **Profit/Loss Tracking**: Keeps track of balance, current positions, and overall profit/loss.
- **Stop Trading**: Halts if profit exceeds $1000 or losses exceed -$1000.
- **Summary Report**: Generates a report with the total number of trades, final balance, and overall profit/loss.

## How it Works

1. The bot starts with an initial balance of $10,000.
2. It buys shares when the price falls 3% below the last buy price (or at the first opportunity).
3. It sells shares when the price rises 5% or falls by 3% (stop-loss).
4. The bot stops once the total profit or loss reaches $1000.
5. A detailed trading history and summary report is generated.

## Technologies Used

- Node.js
- Express.js
- Axios for HTTP requests
- Mock API for simulating stock prices

## Project Structure

```
velotrade/
│
├── src/
│   ├── api/api.js           # Mock API for stock prices
│   ├── services/bot.js           # Trading bot logic and strategies
│   ├── server.js        # Express server setup and API endpoints
│
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Installation

To set up the project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/velotrade.git
   cd velotrade
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

## Running the Application

To run the trading bot, use the following command:

```bash
node src/index.js
```

The server will start and listen for requests on `http://localhost:3000`.


## Demo Video



https://github.com/user-attachments/assets/7f5a64f7-5e11-4bad-9297-2dd3c9b129c9





## Live API Endpoints

You can interact with the trading bot using the following live API endpoints:

### 1. Bot Status

To view the current status of the trading bot, including balance, shares held, and current stock price, use the following endpoint:

```http
GET http://localhost:3000/bot-status
```

**Response:**
```json
{
  "balance": "xxxx.xx",
  "shares": 0,
  "currentPrice": "xx.xx",
  "tradingHistory": [
    {
      "action": "buy",
      "price": xx.xx,
      "shares": 10
    },
    ...
  ],
  "totalProfitLoss": "xxx.xx"
}
```

### 2. Summary Report

To generate a summary report showing the total trades, final balance, and overall profit/loss, use the following endpoint:

```http
GET http://localhost:3000/summary
```

**Response:**
```json
{
  "totalTrades": 5,
  "finalBalance": "xxxx.xx",
  "totalProfitLoss": "xx.xx",
  "tradingHistory": [
    {
      "action": "buy",
      "price": xx.xx,
      "shares": 10
    },
    ...
  ]
}
```

### 3. Stock Price

To get the latest stock prices, use the following endpoint:

```http
GET http://localhost:3000/
```

**Response:**
```json
{
  "Price" : {
    "price": "xx.xx",
}
```

## Conclusion

This trading bot simulation provides a simple yet effective way to understand basic trading logic, how to monitor stock prices, and how to handle trading operations programmatically. You can extend this bot with additional strategies, improve the mock API, or integrate it with a real stock market API for live trading.

---
