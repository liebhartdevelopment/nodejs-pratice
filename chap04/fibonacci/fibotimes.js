const math = require("./math");
const util = require("util");

(async () => {
  for (var num = 1; num < 8000; num++) {
    await new Promise((resolve, reject) => {
      math.fibonacciAsync(num, (err, fibo) => {
        if (err) reject(err);
        else {
          let now = new Date().toISOString();
          console.log(`${now} Fibonacci for ${num} = ${fibo}`);
          resolve();
        }
      });
    });
  }
})().catch(err => {
  console.error(err);
});
