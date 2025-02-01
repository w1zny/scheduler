const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/students", (req, res) => {
	const { workingDays, studentsData } = req.body;

	if (!workingDays)
		return res.status(400).json({ error: "Missing workingDays" });
	if (!studentsData || studentsData.length === 0)
		return res.status(400).json({ error: "Missing studentsData" });

	console.log("Received data:", { workingDays, studentsData });

	res.status(200).json({ message: "Data received successfully" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));