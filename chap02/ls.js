// const fs_readdir = util.promisify(fs.readdir);
const fs_readdir = dir => {
  return new Promise((resolve, reject) => {
    fs_readdir.readdir(dir, (err, fileList) => {
      if (err) reject(err);
      else resolve(fileList);
    });
  });
};
