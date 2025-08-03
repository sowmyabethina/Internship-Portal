const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/internApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: String,
  role: String
});

const Applicant = mongoose.model("Applicant", applicantSchema);

// Routes
app.post("/api/applicants", async (req, res) => {
  const applicant = new Applicant(req.body);
  await applicant.save();
  res.json({ message: "Registered successfully" });
});

app.get("/api/applicants", async (req, res) => {
  const applicants = await Applicant.find();
  res.json(applicants);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
