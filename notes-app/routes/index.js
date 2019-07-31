const express = require("express"),
  router = express.Router(),
  notes = require("../models/notes-memory");

/* GET home page */
router.get("/", async (req, res, next) => {
  let keylist = await notes.keylist();
  let keyPromises = keylist.map(key => {
    return notes.read(key);
  });
  let notelist = await Promise.all(keyPromises);
  res.render("index", { title: "Notes", notelist });
});

module.exports = router;
