const math = require("./math");
const util = require("util");

(async () => {
  for (var num = 1; num < 8000; num++) {
    let fibo = await math.fibonacciAwait(num);
    let now = new Date().toISOString();
    console.log(`${now} Fibonacci for ${num} = ${fibo}`);
  }
})().catch(err => {
  console.error(err);
});
