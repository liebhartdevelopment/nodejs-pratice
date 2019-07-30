const fs = require("fs"),
  util = require("util"),
  fs_readdir = util.promisify(fs.readdir);

(async () => {
  var dir = ".";
  if (process.argv[2]) dir = process.argv[2];
  const files = await fs_readdir(dir);
  for (let fn of files) {
    console.log(fn);
  }
})().catch(err => {
  console.error(err);
});
