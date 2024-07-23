const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get all notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTE 2 : Create a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }).withMessage("Enter a valid Title"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Enter a valid Description"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // If there is no error. Get details from model
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ROUTE 3 : Update note using: PUT "/api/notes/updatenote". Login required
// Only those who area logged in
router.put("/updatenote/:id",
  fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // create a newNote object
    const newNote = {}

    if (title) {newNote.title = title};
    if (description) {newNote.description = description};
    if (tag) {newNote.tag = tag};

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (req.user.id.toString()!== note.user.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    note = await Notes.findByIdAndUpdate(req.params.id, newNote, { new: true });
    res.json(note);
  
});

// ROUTE 4 : Update note using: DELETE "/api/notes/deletenote". Login required
// Only those who area logged in
router.delete("/deletenote/:id",
  fetchuser, async (req, res) => {
    try {
      // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Delete if the user owns this note
    if (req.user.id.toString()!== note.user.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Sucessfully deleted", note: note});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      // res.status(500).send({ message: "Internal Server Error" });
    }
  
});

module.exports = router;
