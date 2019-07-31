const util = require("util"),
  express = require("express"),
  router = express.Router(),
  notes = require("../models/notes-memory");

// Add Note
router.get("/add", (req, res, next) => {
  res.render("noteedit", {
    title: "Add a Note",
    docreate: true,
    notekey: "",
    note: undefined
  });
});

// Save Note (update)
router.post("/save", async (req, res, next) => {
  var note;
  if (req.body.docreate === "create") {
    note = await notes.create(req.body.notekey, req.body.title, req.body.body);
  } else {
    note = await notes.update(req.body.notekey, req.body.title, req.body.body);
  }
  res.redirect("/notes/view?key=" + req.body.notekey);
});

// Read Note (read)
router.get("/view", async (req, res, next) => {
  var note = await notes.read(req.query.key);
  res.render("noteview", {
    title: note ? note.title : "",
    notekey: req.query.key,
    note
  });
});

// Edit Note (update)
router.get("/edit", async (req, res, next) => {
  var note = await notes.read(req.query.key);
  res.render("noteedit", {
    title: note ? "Edit " + note.title : "Add a Note",
    docreate: false,
    notekey: req.query.key,
    note
  });
});

// Ask to Delete Note (destroy)
router.get("/destroy", async (req, res, next) => {
  var note = await notes.read(req.query.key);
  res.render("notedestroy", {
    title: note ? note.title : "",
    notekey: req.query.key,
    note
  });
});

// Actually Delete Note (destroy)
router.post("/destroy/confirm", async (req, res, next) => {
  await notes.destroy(req.body.notekey);
  res.redirect("/");
});

module.exports = router;
