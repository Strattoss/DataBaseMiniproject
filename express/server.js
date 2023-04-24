const express = require("express");
const cors = require("cors");

const app = express();
const customerRouter = require("../routers/customerRouter");
const tripRouter = require("../routers/tripRouter");
const reviewRouter = require("../routers/reviewRouter");
const reservationRouter = require("../routers/reservationRouter");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");


//baza danych 
const dbURI = "mongodb://127.0.0.1/dbbb";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to MongoDB: ", error);
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/trips", tripRouter);
app.use("/reviews", reviewRouter);
app.use("/customers", customerRouter);
app.use("/reservations", reservationRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});