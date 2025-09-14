const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

// View engine + static
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('home', { title: "Healthy Harvest" });
});
app.get('/login', (req, res) => {
    res.render('login', { title: "Login" });
});
app.get('/signup', (req, res) => {
    res.render('signUp', { title: "Sign Up" });
});
app.get('/product', (req, res) => {
    res.render('product', { title: "will be change ATP" });
});
app.get('/cart', (req, res) => {
    res.render('cart', { title: "Shopping Cart" });
});

// ACCOUNT routes
app.get('/account', (req, res) => {
    res.render('account');
});

// Partials (only the right-side content)
app.get("/account/profile-info", (req, res) => {
    res.render("partials/profileInfo");
});

app.get("/account/addresses", (req, res) => {
    res.render("partials/addresses");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// git remote add origin https://github.com/YOUR-USERNAME/my-ecommerce-project.git
// git remote add origin https://github.com/Prakhar007Pathak/Healthy_Harvest.git