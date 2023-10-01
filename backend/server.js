const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./models/index')

const app = express()
const corsOptions = { origin: "http://localhost:3001" }
dotenv.config()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({message: "Welcome"})
})

const PORT = process.env.PORT || 3000;

db.sequelize
    .authenticate()
    .then(() => {
        console.log( "Connection to MySQL database has been established successfully.");
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((e) => {
        console.error("Unable to connect to the database:", error);
    })



