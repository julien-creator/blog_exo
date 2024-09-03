const express = require("express");
const path = require("path");
const datas = require("./datas.json");

const app = express();

LOCAL_PORT = 9000;

const user = {
    username: "jane",
    password: "malcolm",
    islogged: false
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {

    res.render("home", { articles: datas.articles });
});

app.get("/about", (req, res) => {
    res.render("about", { about: datas.about })
})

app.get("/article/:id", (req, res) => {
    const id = Number(req.params.id);
    const article = datas.articles.find((data) => data.id === id);

    if (!article) {
        res.status(404).render("not-found");
        return;
    }
    res.render("article", { article });
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    user.islogged = true;
    user.email = req.body.email
    res.redirect("/");
});

app.get("/logout", (req, res) => {
    user.islogged = false;
    user.username = "joe";

    res.redirect("/");
})

app.get("*", (req, res) => {

    res.status(404).render("not-found");
});

app.listen(LOCAL_PORT, () => console.log(`http://localhost:${LOCAL_PORT}`));
