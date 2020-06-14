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
                })
        });
    });
});