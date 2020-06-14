import express = require("express");
import favicon = require("serve-favicon");
import path = require("path");

const projects: { [key: string]: any } = require(path.join(__dirname, "app", "projects.json"));

const app: express.Application = express();

app.disable('x-powered-by')

app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/projects", function (req, res) {
    res.render("projects", {"projects": projects});
});

app.get("/projects/:project_id", function (req, res, next) {
    const project_id: string = req.params["project_id"];
    if (project_id in projects) {
        res.render("project", projects[project_id]);
    } else {
        next();
    }
});

app.use(function (req, res) {
    res.status(404).render("404");
});

const port: number = Number.parseInt(process.env.PORT || "3000");
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

export default app; // For testing