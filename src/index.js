const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("page1");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        a: req.body.a
    };

    // Check if already exists in the database
    const existingUser = await collection.findOne({ name: data.name });
    if (!existingUser) {
        const emailRege = /^[A-Za-z0-9._%+-]+@gmail.com$/;
        if (!emailRege.test(data.name)) {
            res.render("err");
        } else {
            res.render("bot");

            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword;

            const userdata = await collection.insertMany(data);
            console.log(userdata);
        }
    } else {
        res.send("user data already exists");
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        // Compare the hashed password with password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("bot");
        } else {
            res.send("wrong Password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("please correct it");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
