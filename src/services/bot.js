const { fetchStockPrice } = require("../api/api");

// Bot's starting balance and initial parameters
let balance = 10000; // Starting balance (in dollars)
let shares = 0;      // Number of shares currently held
let buyPrice = 0;    // Price at which shares were bought
let tradingHistory = []; // Record of all trades
let totalProfitLoss = 0; // Track overall profit/loss

// Define stop-loss and profit-taking percentages
const profitThreshold = 1.05; // Sell when the price increases by 5%
const stopLossThreshold = 0.97; // Sell if the price drops by 3%

// Function to simulate stock price monitoring and trade execution
function monitorStockPrice() {
  const monitorInterval = setInterval(() => {
    executeTrade(monitorInterval);
  }, 5000); // Checks every 5 seconds for simplicity
}

// Function to simulate a basic trading strategy
async function executeTrade(monitorInterval) {
  const { price: currentPrice } = await fetchStockPrice() // Fetch stock price

  console.log(`Current Price: $${currentPrice}`);
  
  // Stop if profit or loss target is reached
  if (totalProfitLoss >= 1000) { // Example: Stop if total profit reaches $1000
    console.log('Target profit reached. Stopping trading.');
    clearInterval(monitorInterval); // Stop the monitor
    return;
  } else if (totalProfitLoss <= -1000) { // Example: Stop if total loss reaches -$1000
    console.log('Stop loss reached. Stopping trading.');
    clearInterval(monitorInterval); // Stop the monitor
    return;
  }

  if (shares === 0) {
    // Buy condition: buy when price drops by 3% from the last buy price (or first buy if no shares)
    if (currentPrice < buyPrice * stopLossThreshold || buyPrice === 0) {
      const sharesToBuy = Math.floor(balance / currentPrice);
      balance -= sharesToBuy * currentPrice;
      shares = sharesToBuy;
      buyPrice = currentPrice; // Set the buy price after buying
      tradingHistory.push({ action: 'buy', price: currentPrice, shares: sharesToBuy });
      console.log(`Bought ${sharesToBuy} shares at $${currentPrice}`);
    }
  } else if (shares > 0) {
    // Profit condition: sell when price increases by 5%
    if (currentPrice > buyPrice * profitThreshold) {
      balance += shares * currentPrice;
      totalProfitLoss += (currentPrice - buyPrice) * shares; // Calculate profit/loss
      tradingHistory.push({ action: 'sell', price: currentPrice, shares });
      console.log(`Sold ${shares} shares at $${currentPrice}`);
      shares = 0; // Reset shares after selling
      buyPrice = 0; // Reset buyPrice to allow for a new buy opportunity
    }
    // Stop-loss condition: sell if price drops by 3%
    else if (currentPrice < buyPrice * stopLossThreshold) {
      balance += shares * currentPrice;
      totalProfitLoss += (currentPrice - buyPrice) * shares; // Calculate profit/loss
      tradingHistory.push({ action: 'sell', price: currentPrice, shares });
      console.log(`Sold ${shares} shares at $${currentPrice} (Stop Loss)`);
      shares = 0; // Reset shares after selling
      buyPrice = 0; // Reset buyPrice
    }
  }

  // Return status for API endpoint or logs
  return {
    balance: balance.toFixed(2),
    shares,
    currentPrice: currentPrice.toFixed(2),
    tradingHistory,
    totalProfitLoss: totalProfitLoss.toFixed(2), // Include total profit/loss
  };
}

// Function to generate a summary report
function generateSummaryReport() {
  const totalTrades = tradingHistory.length;
  const summary = {
    totalTrades,
    finalBalance: balance.toFixed(2),
    totalProfitLoss: totalProfitLoss.toFixed(2),
    tradingHistory,
  };
  console.log("Summary Report:", summary);
  return summary;
}

module.exports = { monitorStockPrice, executeTrade, generateSummaryReport };
