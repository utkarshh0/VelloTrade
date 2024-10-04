
let stockPrice = 1000; // Initial price

// Function to get the current stock price
function getStockPrice() {

  // Random price fluctuation between -3% to +5%
  const minChange = -0.03; // -3%
  const maxChange = 0.05;  // +5%
  const change = stockPrice * (minChange + Math.random() * (maxChange - minChange));
  stockPrice += change;
  return stockPrice.toFixed(2); // Returns the stock price with 2 decimal places
}

// New function to simulate fetching price from an endpoint
function fetchStockPrice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const price = getStockPrice();
      resolve({ price: parseFloat(price) }); // Return price in a structured format
    }, 700); // Simulate API delay
  });
}

module.exports = { fetchStockPrice };