const express = require("express");
const noteModel = require("./model/note_model");
const { title } = require("process");


const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
    const data = req.body;
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note Created"
    })
})

app.get("/notes", async (req, res) => {
    const note = await noteModel.find();

    res.status(200).json({
        message: "Notes extracted Succesfully",
        notes: note
    })
})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    await noteModel.findByIdAndUpdate({ _id: id }, { title: title, description: description })

    res.status(200).json({
        message: "Updated Succesfully"
    })
})

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;
    
    await noteModel.findByIdAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Deleted Succesfully"
    })
})
module.exports = app;