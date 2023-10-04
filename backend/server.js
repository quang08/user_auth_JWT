const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

//db
const db = require("./models/index");
const Role = db.role;

const app = express();
const corsOptions = { origin: "http://localhost:3000" };
dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test", require("./routes/user.routes"));

db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// })

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const initial = () => {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
};

// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log(
//       "Connection to MySQL database has been established successfully.",
//     );
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}.`);
//     });
//   })
//   .catch((e) => {
//     console.error("Unable to connect to the database:", error);
//   });
