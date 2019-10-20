function maxProfit(prices) {

    var index = 0;
    var n = prices.length;
    var answer = 0;
    var last;

    while (index < n) {
        last = prices[index];
        answer -= last;
        while (index + 1 < n && prices[index] <= prices[index + 1]) {
            index++;
            last = prices[index];
        }
        answer += last;
        index++;
    }
    return answer;
}

module.exports = maxProfit;