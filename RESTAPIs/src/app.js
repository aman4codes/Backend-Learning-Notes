const express = require("express"); //server create hus

const app = express();

app.use(express.json()); //middleware

const notes = [];

//get RESTAPI
app.get("/notes", (req, res) => {
	// const index= req.params.index;
	// const title = notes[index].title;
	// const description = notes[index].description;
	res.send(notes);
})

//post RESTAPI
app.post("/notes", (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	notes.push({ title, description });
	res.send(`notes is updated and no of notes saved is ${notes.length}`);
})

//patch RESTAPI
app.patch("/notes/:index", (req, res) => {
	const index = req.params.index;
	notes[index].title = req.body.title;
	notes[index].description = req.body.description;

	// notes.push({ title, description });
	res.send(`notes is updated`);
})

//delete RESTAPI
app.delete("/notes/:index", (req, res) => {
	const index = req.params.index;

	delete notes[index];
	// notes.push({ title, description });
	res.send(`notes at index ${index} is deleted`);
})



module.exports = app; //  exported to server.js file to run server