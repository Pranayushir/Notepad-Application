const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Router 1:  fetch user notes get method : "api/auth/fetchallnotes". login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error occured!!!");
  }
});

// Router 2:  add user notes post method : "api/auth/addnote". login required

router.post("/addnote",fetchuser,
  [
    body("title", "enter title of minimum 3 characters").isLength({ min: 3 }),
    body("description", "enter description of minimum 5 characters").isLength({min: 5}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tag} = req.body;
    try {
      const newnote = new Note({
        title,description,tag,user :req.user.id
      })
      const savednote = await newnote.save();
      res.json(savednote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured!!!");
    }
  }
);

// Router 3:  update user notes put method : "api/auth/addnote". login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  
  try {
    const {title,description,tag} = req.body;
    const newnote = {}
    if(title){
      newnote.title = title;
    }
    if(description){
      newnote.description = description;
    }
    if(tag){
      newnote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new :true});
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error occured!!!");
  }
});

// Router 4:  delete user note delete method : "api/auth/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted","deleted note" : note});
  } catch (error) {  
    console.log(error);
    res.status(500).send("Internal error occured!!!");
  }
});

module.exports = router;
