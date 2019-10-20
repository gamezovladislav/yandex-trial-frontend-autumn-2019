var maxProfit = function (prices) {
    return calculate(prices, 0);
};

function calculate(prices, index) {
    if (index >= prices.length) {
        return 0;
    }

    var maxProfix = 0;

    for (var start = index; start < prices.length; start++) {
        var localMaxProfit = 0;
        for (var i = start + 1; i < prices.length; i++) {
            if (prices[start] < prices[i]) {
                var profit = calculate(prices, i + 1) + prices[i] - prices[start];
                if (profit > localMaxProfit) {
                    localMaxProfit = profit;
                }
            }
        }

        if (localMaxProfit > maxProfix)
            maxProfix = localMaxProfit;
    }
    return maxProfix;
}

let prices = [1,2,1,2,1,2,1,2,1,2,1];
console.log(maxProfit(prices));
