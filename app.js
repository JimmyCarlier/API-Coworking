const express = require("express");
// npm install morgan --save-dev
const morgan = require("morgan");
// npm install express / npm install nodemon
const app = express();
const port = 3000;

const coworkingRouter = require("./routes/coworkingRoutes");
const sequelize = require("./dataBase/sequelize");

sequelize.initDataBase();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/coworkings", coworkingRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Read
// app.get("/api/coworkings", (req, res) => {
//   const arraySort = coworkings.sort((a, b) => a.superficy - b.superficy);
//   res.json({ result: arraySort });
// });
