import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp)
chai.should();

describe("Website", () => {
    describe("GET /", () => {
        it("should load homepage", (done) => {
            chai.request(app)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
    describe("GET /projects", () => {
        it("should load projects list", (done) => {
            chai.request(app)
                .get("/projects")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
    describe("GET /projects/LES", () => {
        it("should load project page", (done) => {
            chai.request(app)
                .get("/projects/LES")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
    describe("GET /projects/does-not-exist", () => {
        it("should load 404 page", (done) => {
            chai.request(app)
                .get("/projects/does-not-exist")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});